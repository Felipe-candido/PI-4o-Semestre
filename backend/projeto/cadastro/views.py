from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from .serializers import registroSerializer
from django.contrib.auth import get_user_model

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








# @api_view(['GET'])
# def get_usuarios(request):
    
#     if request.method == 'GET':
        
#         users = usuario.objects.all()
#         serializer = usuarioSerializer(users, many=True)
#         print(serializer.data[0]['nome'])
#         return Response(serializer.data)
        

#     return Response(status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def post_usuarios(request):
    
#     if request.method == 'POST':
        
#         user = usuarioSerializer(data = request.data)
#         user.is_valid(raise_exception=True)
#         user.save
#         print(user.data[0]['nome'])
#         return Response(user.data, status=status.HTTP_201_CREATED)

#     return Response(status=status.HTTP_400_BAD_REQUEST)