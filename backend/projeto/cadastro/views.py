import token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from .serializers import registroSerializer, loginSerializer
from django.contrib.auth import get_user_model, login
from rest_framework.authtoken.models import Token

user = get_user_model()


# Create your views here.

class view_registro(viewsets.ModelViewSet):
    queryset = user.objects.all()
    serializer_class = registroSerializer
    http_method_names = ['post', 'options']

    def create(self, request, *args, **kwargs):   
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensagem': 'Usuario registrado com sucesso!'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


class viewLogin(viewsets.ViewSet):
    def create(self, request):
        
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            token, create = Token.objects.get_or_create(user=user)

            return Response({
                "token": token.key, 
                "user_id": user.id, 
                "email": user.email
            })

        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )







