from urllib.error import HTTPError
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os.path
import pickle
from datetime import datetime, timedelta, timezone
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
            'summary': f'Reserva - {reserva.Imovel.titulo}',
            'description': f'Reserva feita por {reserva.usuario.nome}',
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

    def verificar_disponibilidade(self, calendar_id, start, end):
        try:
            # Garantir que as datas têm timezone
            if not start.tzinfo:
                start = start.replace(tzinfo=timezone.utc)
            if not end.tzinfo:
                end = end.replace(tzinfo=timezone.utc)
            
            # Formatar datas corretamente
            time_min = start.isoformat()
            time_max = end.isoformat()
            
            events_result = self.service.events().list(
                calendarId=calendar_id,
                timeMin=time_min,
                timeMax=time_max,
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            return len(events_result.get('items', [])) == 0
            
        except Exception as e:
            logger.error(f"Erro ao verificar disponibilidade: {str(e)}")
            raise ValueError(f"Erro ao verificar disponibilidade: {str(e)}")