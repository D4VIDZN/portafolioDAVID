# Arquitectura Propuesta: Gestión de Eventos Universitarios (Capas)

## Estilo Elegido: Arquitectura por Capas

El diseño se basa en la separación estricta de responsabilidades en cuatro niveles: Presentación, Lógica de Negocio, Acceso a Datos y Persistencia. Esto maximiza la mantenibilidad y la testabilidad del sistema.

### Componentes Clave

1.  **Capa de Presentación:** Controladores API y la interfaz de usuario (web/móvil).
2.  **Capa de Lógica de Negocio:** Contiene las reglas clave (ej: límites de aforo, permisos de inscripción).
3.  **Capa de Acceso a Datos (DAL):** Repositorios que gestionan la comunicación con la base de datos.
4.  **Capa de Datos:** Almacenamiento persistente (ej: PostgreSQL).

### Diagrama de Flujo Arquitectónico

```mermaid
graph TD
    subgraph Cliente
        A[Usuario/Estudiante]
    end
    
    subgraph Servidor
        direction TB
        B[Capa de Presentación: API Controller/Web UI]
        C[Capa de Lógica de Negocio: Gestor de Eventos y Reglas]
        D[Capa de Acceso a Datos (DAL): Repositorios]
    end
    
    E[Capa de Datos: Base de Datos (PostgreSQL)]
    
    A --> B
    B --> C: Llama a servicios de negocio
    C --> D: Pide datos
    D --> E: Consultas SQL
    E --> D: Devuelve resultados
    D --> C: Devuelve datos de negocio
    C --> B: Devuelve datos listos para mostrar
    B --> A: Muestra Interfaz/Respuesta API
    
    style B fill:#f9f,stroke:#333
    style C fill:#ccf,stroke:#333
    style D fill:#cff,stroke:#333
    style E fill:#faa,stroke:#333
