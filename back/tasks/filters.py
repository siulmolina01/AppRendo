import django_filters
from tasks import models as tasks_models


class StepFilter(django_filters.FilterSet):
    type_step = django_filters.Filter(method='filter_type')

    def filter_type(self, queryset, name, value):
        print(value)
        return queryset.filter(type=value)

    class Meta:
        model = tasks_models.Step
        fields = ('type_step',)
