import math
import js

# Función para calcular el crecimiento bacteriano usando el modelo exponencial
def calcular_crecimiento_bacteriano(p0, k, t):
    """
    Calcula la población bacteriana después de un tiempo t usando el modelo exponencial.
    
    Parámetros:
    p0 (float): Población inicial
    k (float): Constante de crecimiento
    t (float): Tiempo transcurrido
    
    Retorna:
    float: Población después del tiempo t
    """
    return p0 * math.exp(k * t)

# Función para generar datos para la gráfica
def generar_datos_grafica(p0, k, t_max, puntos=50):
    """
    Genera datos para la gráfica de crecimiento bacteriano.
    
    Parámetros:
    p0 (float): Población inicial
    k (float): Constante de crecimiento
    t_max (float): Tiempo máximo para la gráfica
    puntos (int): Número de puntos a generar
    
    Retorna:
    tuple: (tiempos, poblaciones)
    """
    tiempos = []
    poblaciones = []
    
    for i in range(puntos + 1):
        t = i * (t_max / puntos)
        p = calcular_crecimiento_bacteriano(p0, k, t)
        tiempos.append(t)
        poblaciones.append(p)
    
    return tiempos, poblaciones

# Función para calcular el tiempo de duplicación
def tiempo_duplicacion(k):
    """
    Calcula el tiempo de duplicación de la población bacteriana.
    
    Parámetros:
    k (float): Constante de crecimiento
    
    Retorna:
    float: Tiempo de duplicación
    """
    if k <= 0:
        return float('inf')  # No hay duplicación si k <= 0
    return math.log(2) / k

# Función para exportar a JavaScript (si es necesario)
def exportar_funciones():
    """
    Exporta las funciones de Python a JavaScript para que puedan ser utilizadas
    desde el código JavaScript si es necesario.
    """
    # En un entorno real con PyScript, podríamos exponer estas funciones
    # para que JavaScript las llame
    pass

# Ejemplo de uso
if __name__ == "__main__":
    # Valores de ejemplo
    p0_ejemplo = 100
    k_ejemplo = 0.1
    t_ejemplo = 5
    
    # Calcular población después de t unidades de tiempo
    poblacion = calcular_crecimiento_bacteriano(p0_ejemplo, k_ejemplo, t_ejemplo)
    print(f"Población inicial: {p0_ejemplo}")
    print(f"Constante de crecimiento: {k_ejemplo}")
    print(f"Tiempo: {t_ejemplo}")
    print(f"Población después de {t_ejemplo} unidades de tiempo: {poblacion:.2f}")
    
    # Calcular tiempo de duplicación
    t_dup = tiempo_duplicacion(k_ejemplo)
    print(f"Tiempo de duplicación: {t_dup:.2f} unidades de tiempo")