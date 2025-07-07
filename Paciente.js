// Simulação de uma API para gerenciar pacientes
class PacienteAPI {
  constructor() {
    this.storageKey = 'tio_paulo_pacientes';
    this.data = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async create(pacienteData) {
    const newPaciente = {
      ...pacienteData,
      id: this.generateId(),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    
    this.data.push(newPaciente);
    this.saveToStorage();
    return newPaciente;
  }

  async list(orderBy = 'created_date') {
    let sortedData = [...this.data];
    
    if (orderBy.startsWith('-')) {
      const field = orderBy.substring(1);
      sortedData.sort((a, b) => new Date(b[field]) - new Date(a[field]));
    } else {
      sortedData.sort((a, b) => new Date(a[orderBy]) - new Date(b[orderBy]));
    }
    
    return sortedData;
  }

  async getById(id) {
    return this.data.find(paciente => paciente.id === id);
  }

  async update(id, updateData) {
    const index = this.data.findIndex(paciente => paciente.id === id);
    if (index !== -1) {
      this.data[index] = {
        ...this.data[index],
        ...updateData,
        updated_date: new Date().toISOString()
      };
      this.saveToStorage();
      return this.data[index];
    }
    throw new Error('Paciente não encontrado');
  }

  async delete(id) {
    const index = this.data.findIndex(paciente => paciente.id === id);
    if (index !== -1) {
      const deleted = this.data.splice(index, 1)[0];
      this.saveToStorage();
      return deleted;
    }
    throw new Error('Paciente não encontrado');
  }
}

export const Paciente = new PacienteAPI();

