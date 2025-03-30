from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from .serializers import registroSerializer, loginSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

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
            
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_Token = str(refresh)

            return Response({
                "user_id": user.id, 
                "email": user.email,
                "access": access_token,
                "refresh": refresh_Token,
            })

        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )







