import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for TypeScript support
export const TABLES = {
  PACIENTES: 'pacientes',
  CONSULTAS: 'consultas'
}

// Helper functions for database operations
export const dbHelpers = {
  // Pacientes
  async createPaciente(data) {
    const { data: paciente, error } = await supabase
      .from(TABLES.PACIENTES)
      .insert([data])
      .select()
      .single()
    
    if (error) throw error
    return paciente
  },

  async getPacientes(orderBy = 'created_at') {
    const ascending = !orderBy.startsWith('-')
    const field = orderBy.startsWith('-') ? orderBy.substring(1) : orderBy
    
    const { data, error } = await supabase
      .from(TABLES.PACIENTES)
      .select('*')
      .order(field, { ascending })
    
    if (error) throw error
    return data || []
  },

  async getPacienteById(id) {
    const { data, error } = await supabase
      .from(TABLES.PACIENTES)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async updatePaciente(id, data) {
    const { data: paciente, error } = await supabase
      .from(TABLES.PACIENTES)
      .update(data)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return paciente
  },

  async deletePaciente(id) {
    const { error } = await supabase
      .from(TABLES.PACIENTES)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Consultas
  async createConsulta(data) {
    const { data: consulta, error } = await supabase
      .from(TABLES.CONSULTAS)
      .insert([data])
      .select()
      .single()
    
    if (error) throw error
    return consulta
  },

  async createConsultas(dataArray) {
    const { data, error } = await supabase
      .from(TABLES.CONSULTAS)
      .insert(dataArray)
      .select()
    
    if (error) throw error
    return data || []
  },

  async getConsultas(orderBy = 'created_at') {
    const ascending = !orderBy.startsWith('-')
    const field = orderBy.startsWith('-') ? orderBy.substring(1) : orderBy
    
    const { data, error } = await supabase
      .from(TABLES.CONSULTAS)
      .select('*')
      .order(field, { ascending })
    
    if (error) throw error
    return data || []
  },

  async getConsultasByPaciente(pacienteId) {
    const { data, error } = await supabase
      .from(TABLES.CONSULTAS)
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data_atendimento', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}