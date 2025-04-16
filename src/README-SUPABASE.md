
# Ford360 - Configuração do Supabase

Este projeto utiliza o Supabase para autenticação de usuários e armazenamento de dados. Siga as etapas abaixo para configurar corretamente a integração com o Supabase.

## Conectando Lovable ao Supabase

1. Clique no botão verde do Supabase no canto superior direito da interface do Lovable
2. Conecte ao Supabase seguindo as instruções na tela
3. Após a conexão, o projeto poderá utilizar a autenticação e banco de dados do Supabase

## Tabelas necessárias no Supabase

Depois de conectar ao Supabase, você precisará criar a seguinte tabela:

### Tabela `profiles`

```sql
create table
  public.profiles (
    id uuid not null,
    full_name text null,
    company_name text null,
    email text null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null,
    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;
```

## Permissões RLS (Row Level Security)

Configure as políticas RLS para proteger seus dados:

```sql
-- Habilitar RLS
alter table profiles enable row level security;

-- Política para usuários autenticados lerem seus próprios dados
create policy "Usuários podem ler seus próprios dados"
  on profiles for select
  using (auth.uid() = id);

-- Política para usuários autenticados atualizarem seus próprios dados
create policy "Usuários podem atualizar seus próprios dados"
  on profiles for update
  using (auth.uid() = id);

-- Política para permitir inserções durante o registro
create policy "Permitir inserções durante o registro"
  on profiles for insert
  with check (true);
```

## Auth - Configurações

1. Ative "Email Auth" nas configurações de autenticação do Supabase
2. Configure o redirecionamento para a URL do seu site

## Substituição do código placeholder

Após conectar o Supabase, substitua o arquivo `src/lib/supabase-placeholder.ts` pelo código gerado automaticamente com as credenciais reais do seu projeto Supabase.
