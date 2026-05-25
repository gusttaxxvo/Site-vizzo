import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function Select() {
  const [tabela, setTabela] = useState('tb_morador')
  const [dados, setDados] = useState<any[]>([])

  async function buscarDados(tabelaSelecionada: string) {
    console.log('Buscando tabela:', tabelaSelecionada)

    const { data, error } = await supabase
      .from(tabelaSelecionada)
      .select('*')

    if (error) {
      console.log('Erro Supabase:', error.message)
      setDados([])
      return
    }

    console.log('Dados retornados:', data)
    setDados(data || [])
  }

  useEffect(() => {
    buscarDados(tabela)
  }, [tabela])

  return (
    <div>
      <h1>Selecionar tabela</h1>

      <select
        value={tabela}
        onChange={(e) => {
          console.log('Selecionou:', e.target.value)
          setTabela(e.target.value)
        }}
      >
        <option value="user">tb_morador</option>
        <option value="tb_abaixo_assinado">tb_abaixo_assinado</option>
        <option value="tb_administrador">tb_administrador</option>
        <option value="tb_assinatura">tb_assinatura</option>
        <option value="tb_comunicado">tb_comunicado</option>
        <option value="tb_condominio">tb_condominio</option>
        <option value="tb_contrato">tb_contrato</option>
        <option value="tb_opcao_votacao">tb_opcao_votacao</option>
        <option value="tb_reserva">tb_reserva</option>
        <option value="tb_votacao">tb_votacao</option>
        <option value="tb_voto">tb_voto</option>
      </select>

      <hr />

      <ul>
        {dados.length === 0 ? (
          <p>Nenhum dado encontrado</p>
        ) : (
          dados.map((item, index) => (
            <li key={index}>
              {JSON.stringify(item)}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}