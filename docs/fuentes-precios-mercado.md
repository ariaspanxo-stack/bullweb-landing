# Fuentes — Precios de referencia de mercado (calculadora de módulos)

> **ESTADO: FUENTES PENDIENTES.**
> El operador aún no ha pegado las URLs de su asesor ni los valores de referencia
> por módulo. Por regla anti-invención (Hotfix #191), la calculadora sin desglose
> NO se implementó con cifras inventadas: el rework queda detenido hasta que
> lleguen los números reales.

## Módulos planificados (4 checkboxes de la calculadora)

| Módulo | Precio de referencia (CLP/mes) | Fuente |
|---|---|---|
| KDS (Pantalla de Cocina) | PENDIENTE | PENDIENTE |
| Gestión de mesas | PENDIENTE | PENDIENTE |
| Ventas por comensal | PENDIENTE | PENDIENTE |
| Delivery Apps (integración) | PENDIENTE | PENDIENTE |

## Cómo completar este archivo

1. El operador pega las URLs entregadas por su asesor (listado público de
   precios de la competencia) y el valor de referencia por módulo.
2. Rellenar la tabla de arriba (URL + precio). No inventar cifras.
3. Recién entonces implementar la calculadora v2 (Hotfix #191, Fase 2):
   - 4 checkboxes (KDS, Gestión de mesas, Ventas por comensal, Delivery Apps).
   - Cálculo interno: suma de los precios de referencia de los módulos
     seleccionados = "tu plan típico hoy".
   - Salida: "Tu plan típico hoy: [total] al mes. Con BullWeb: $34.000.
     Te sobran [diferencia] todos los meses." — la diferencia es el número grande.
   - PROHIBIDO en pantalla: desglose del plan base, precios por módulo,
     nombres de competidores.
   - Pie: "Precios de referencia de mercado (ago-2026)."
   - CTA: WhatsApp contextual de la sección
     (`Hola, quiero comparar cuánto estoy pagando hoy`).

## Nota de datación

El pie de la calculadora dirá "Precios de referencia de mercado (ago-2026)"
según lo especificado en el Hotfix #191; si las fuentes llegan más tarde,
actualizar la datación a la fecha real de las URLs.
