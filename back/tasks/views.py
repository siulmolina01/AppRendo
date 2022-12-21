from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework import permissions
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet
from tasks import models as tasks_models
from tasks import serializers as tasks_serializers
from tasks import filters as tasks_filters
from accounts import models as accounts_models
from datetime import datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


# Create your views here.

class TaskView(mixins.ListModelMixin,
               mixins.RetrieveModelMixin,
               mixins.CreateModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
               GenericViewSet
               ):
    queryset = tasks_models.Task.objects.all()
    serializer_class = tasks_serializers.TaskSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = (SearchFilter,)
    search_fields = ('title',)

    def create(self, request, *args, **kwargs):
        import json
        # parse x:
        data = request.data
        data._mutable = True
        print('ablaricoque', data['pictoSteps'], type(data['pictoSteps']))
        datos = {}

        if data['textSteps'] == '[]':
            datos['textSteps'] = []
        datos['textSteps'] = data['textSteps']
        del data['textSteps']

        if data['pictoSteps'] == '[]':
            datos['pictoSteps'] = []
        datos['pictoSteps'] = data['pictoSteps']
        del data['pictoSteps']

        count = 0
        for step in range(int(data['imgCount'])):
            datos['imgTitle' + str(count)] = data['imgTitle' + str(count)]
            del data['imgTitle' + str(count)]
            datos['img' + str(count)] = data['img' + str(count)]
            del data['img' + str(count)]
            datos['imgAltText' + str(count)] = data['imgAltText' + str(count)]
            del data['imgAltText' + str(count)]
            count = count + 1

        count = 0
        for step in range(int(data['videoCount'])):
            datos['videoTitle' + str(count)] = data['videoTitle' + str(count)]
            del data['videoTitle' + str(count)]
            datos['video' + str(count)] = data['video' + str(count)]
            del data['video' + str(count)]
            datos['videoAltText' + str(count)] = data['videoAltText' + str(count)]
            del data['videoAltText' + str(count)]
            count = count + 1

        datos['imgCount'] = data['imgCount']
        del data['imgCount']
        datos['videoCount'] = data['videoCount']
        del data['videoCount']

        # Check if it's a picto or a simple image
        if 'picto' in data and not 'img' in data:
            data['pictogram'] = data['picto']
            data['img'] = None
            datos['picto'] = data['picto']
        elif not 'picto' in data and 'img' in data:
            data['image'] = data['img']
            data['pictogram'] = None
            datos['img'] = data['img']
        elif 'picto' and 'img' in data:
            data['image'] = data['img']
            data['pictogram'] = data['picto']
            datos['img'] = data['img']
            datos['picto'] = data['img']
        else:
            data['image'] = None
            data['pictogram'] = None

        if 'initialDate' in data:
            start_date = data['initialDate']
            start_date_obj = datetime.strptime(start_date, '%d/%m/%Y')
        else:
            start_date = None
            start_date_obj = None

        if 'endDate' in data:
            end_date = data['endDate']
            end_date_obj = datetime.strptime(end_date, '%d/%m/%Y')
        else:
            end_date = None
            end_date_obj = None

        print('ALTEXT!!!!!!!!!!!!!!!!!!!!', data['altText'])

        if 'pupil' in data:
            pupil = accounts_models.Pupil.objects.filter(pk=int(data['pupil'])).first()
            task = tasks_models.Task.objects.create(title=data['title'], pupil=pupil,
                                                    start_date=start_date_obj, end_date=end_date_obj,
                                                    pictogram=data['pictogram'], image=data['img'],
                                                    pictogram_description=data['altText'])
        else:
            task = tasks_models.Task.objects.create(title=data['title'],
                                                    start_date=start_date_obj, end_date=end_date_obj, image=data['img'],
                                                    pictogram=data['pictogram'], pictogram_description=data['altText'])

        textSteps = json.loads(datos['textSteps'])
        print('textSteps', textSteps)
        print(type(textSteps))

        count = 1
        for text_step in textSteps:
            if 'title' in text_step:
                title = text_step['title']
            else:
                title = None
            if 'text' in text_step:
                text = text_step['text']
            else:
                text = None

            tasks_models.Step.objects.create(task=task, position=count, text=text, title=title, type='text')
            count = count + 1

        pictoSteps = json.loads(datos['pictoSteps'])
        print('pictoSteps', pictoSteps)
        print(type(pictoSteps))

        count = 1
        print('ahora!!!', pictoSteps)
        for picto_step in pictoSteps:
            print('iteracion del picto', picto_step)
            if 'title' in picto_step:
                title = picto_step['title']
            else:
                title = None
            if 'picto' in picto_step and 'altText' in picto_step:
                print('a verrrr', picto_step['picto'])
                if picto_step['picto'] != '':
                    picto = picto_step['picto']
                    pictogram_description = picto_step['altText']
                else:
                    picto = None
                    pictogram_description = None
            else:
                picto = None
                pictogram_description = None
            print('AQUI!!!', picto)
            tasks_models.Step.objects.create(task=task, position=count, pictogram=picto, title=title,
                                             pictogram_description=pictogram_description, type='picto')
            count = count + 1

        count = 1
        for image_step in range(int(datos["imgCount"])):
            title = datos['imgTitle' + str(count - 1)]
            image = datos['img' + str(count - 1)]
            pictogram_description = datos['imgAltText' + str(count - 1)]
            tasks_models.Step.objects.create(task=task, position=count, title=title, image=image,
                                             pictogram_description=pictogram_description, type='image')
            count = count + 1

        count = 1
        for video_step in range(int(datos["videoCount"])):
            title = datos['videoTitle' + str(count - 1)]
            video = datos['video' + str(count - 1)]
            pictogram_description = datos['videoAltText' + str(count - 1)]
            tasks_models.Step.objects.create(task=task, position=count, title=title, video=video,
                                             pictogram_description=pictogram_description, type='video')
            count = count + 1

        return Response(tasks_serializers.TaskSerializer(task).data, status=status.HTTP_200_OK)


class StepView(mixins.ListModelMixin,
               mixins.RetrieveModelMixin,
               mixins.CreateModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
               GenericViewSet
               ):
    queryset = tasks_models.Step.objects.all()
    serializer_class = tasks_serializers.StepSerializer
    permission_classes = [permissions.AllowAny]
    # filter_class = tasks_filters.StepFilter
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter,)
    filterset_fields = ['type', 'task']


class CommandView(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  GenericViewSet
                  ):
    queryset = tasks_models.Command.objects.all()
    serializer_class = tasks_serializers.CommandSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter,)
    # filterset_fields = ['type', 'task']

    def create(self, request, *args, **kwargs):
        data = request.data
        data._mutable = True

        print(data)

        if not 'picto' in data:
            data['picto'] = None
        if not 'img' in data:
            data['img'] = None


        if not 'pupil' in data:
            data['pupil'] = None
        pupil_object = accounts_models.Pupil.objects.filter(pk=data['pupil']).first()


        start_date = data['startDate']
        start_date_obj = datetime.strptime(start_date, '%d/%m/%Y')

        end_date = data['endDate']
        end_date_obj = datetime.strptime(end_date, '%d/%m/%Y')

        command_task = tasks_models.Command.objects.create(
            title=data['title'],
            pupil=pupil_object,
            pictogram=data['picto'],
            image=data['img'],
            start_date=start_date_obj,
            end_date=end_date_obj,
        )
        return Response(tasks_serializers.CommandSerializer(command_task).data, status=status.HTTP_200_OK)
