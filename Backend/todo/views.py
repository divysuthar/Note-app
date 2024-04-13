from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .serializer import Noteserializer
from .models import Note
# Create your views here.

@api_view(['POST'])
def loginView(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username = username, password = password)
        
        if user is not None:
            login(request, user)
            return Response({'message' : 'Login successful'})
        else:
            return Response({'message' : 'Invalid details'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({'message' : 'This method is not valid'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])   
def logoutView(request):
    if request.method == 'POST':
        logout(request)
        return Response({'message' : 'Logout successful'})
    return Response({'message' : 'This method is not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def registerView(request):
    if request.method == 'POST':
        password = request.data.get('password')
        username = request.data.get('username')
        email = request.data.get('email')
        if not password or not username or not email:
            return Response({'message' : 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'message' : 'This username is already exist'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username = username, password = password, email= email)
        user.save()
        return Response({'message' : 'User created'})
    return Response({'message' : 'This method is not supported'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['PUT'])
def updateView(request, pk):
    if request.method == 'PUT':
        try:
            note = Note.objects.get(id = pk)
        except note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = Noteserializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'Note successfully updated'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def createView(request):
    if request.method == 'POST':
        serializer = Noteserializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'Note created'}, status=status.HTTP_201_CREATED)
        return Response({'message' : 'Error'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message' : 'This method is not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def getNotes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = Noteserializer(notes, many = True)
        return Response(serializer.data)
    return Response({'message' : 'This method is not valid'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
def deleteView(request, id):
    if request.method == 'DELETE':
        note = Note.objects.get(id = id)
        note.delete()
        return Response({'message' : 'Note deleted'})
    return Response({'message' : 'This method is not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# @api_view(['DELETE'])
# def deleteView(request, id):
#     if request.method == 'DELETE':
#         note = get_object_or_404(Note, id=id)
#         note.delete()
#         return Response({'message': 'Note deleted'})
#     return Response({'message': 'This method is not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def getNote(request, id):
    if request.method == 'GET':
        try:
            note = Note.objects.get(id = id)
            serializer = Noteserializer(note, many = False)
            return Response(serializer.data)
        except:
            return Response({'message' : 'This note not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'message' : 'This method is not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)