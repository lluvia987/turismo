import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useGalery() {
  const [photos, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('galery')
        .select('*')

      if (error) {
        console.error('Error obteniendo las imagenes:', error)
        setError(error)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return { photos, loading, error }
}