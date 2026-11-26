from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Serie(models.Model):
    titulo = models.CharField(max_length=100)
    plataforma = models.CharField(max_length=30)

    ano = models.IntegerField(
        validators=[
            MinValueValidator(1900, message="O ano de lançamento deve ser a partir de 1900."),
            MaxValueValidator(2026, message="O ano de lançamento não pode ser acima de 2026.")
        ]
    )

    avaliacao = models.FloatField(
        validators = [
            MinValueValidator(0.0, message="A avaliação mínima é 0."),
            MaxValueValidator(10.0, message="A avaliação máxima é 10.")
        ]
    )

    def __str__(self):
        return self.titulo