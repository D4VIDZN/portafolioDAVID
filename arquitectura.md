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
