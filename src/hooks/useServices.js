// hooks/useDestinos.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useServices() {
  const [destinos, setDestinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchDestinos() {
      const { data, error } = await supabase
        .from('servicios')
        .select('*')

      if (error) {
        console.error('Error trayendo destinos:', error)
        setError(error)
      } else {
        setDestinos(data)
      }
      setLoading(false)
    }

    fetchDestinos()
  }, [])

  return { destinos, loading, error }
}