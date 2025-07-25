from .models import Reserva

class ReservaRepository():

    @staticmethod
    def get_by_id(reserva_id):
        return Reserva.objects.select_related('Imovel').get(id=reserva_id)