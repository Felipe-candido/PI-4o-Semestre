from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os.path
import pickle
from datetime import datetime, timedelta
from django.conf import settings

SCOPES = ['https://www.googleapis.com/auth/calendar']

class GoogleCalendarService:
    def __init__(self):
        self.creds = None
        self.service = None
        self.initialize_credentials()

    def initialize_credentials(self):
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                self.creds = pickle.load(token)

        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                self.creds = flow.run_local_server(port=0)
            
            with open('token.pickle', 'wb') as token:
                pickle.dump(self.creds, token)

        self.service = build('calendar', 'v3', credentials=self.creds)

    def criar_calendario_chacara(self, nome_chacara):
        calendar = {
            'summary': f'Reservas - {nome_chacara}',
            'timeZone': 'America/Sao_Paulo'
        }
        created_calendar = self.service.calendars().insert(body=calendar).execute()
        return created_calendar['id']

    def criar_evento_reserva(self, calendar_id, reserva):
        event = {
            'summary': f'Reserva - {reserva.chacara.nome}',
            'description': f'Reserva feita por {reserva.usuario.username}',
            'start': {
                'dateTime': reserva.data_inicio.isoformat(),
                'timeZone': 'America/Sao_Paulo',
            },
            'end': {
                'dateTime': reserva.data_fim.isoformat(),
                'timeZone': 'America/Sao_Paulo',
            },
        }

        event = self.service.events().insert(calendarId=calendar_id, body=event).execute()
        return event['id']

    def verificar_disponibilidade(self, calendar_id, data_inicio, data_fim):
        events_result = self.service.events().list(
            calendarId=calendar_id,
            timeMin=data_inicio.isoformat(),
            timeMax=data_fim.isoformat(),
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        
        return len(events_result.get('items', [])) == 0

    def cancelar_evento(self, calendar_id, event_id):
        self.service.events().delete(calendarId=calendar_id, eventId=event_id).execute() 