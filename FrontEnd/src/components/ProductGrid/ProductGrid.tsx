// components/ProductGrid.tsx
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../lib/api'
import { ProductCard } from './ProductCard'

export function ProductGrid({
  title,
  category,
}: {
  title: string
  category: string
}) {
  const { data, isLoading, isError } = useQuery(
    ['products', category],
    () => fetchProducts(category)
  )

  if (isLoading) return <p className="text-center py-8">Loading {title}...</p>
  if (isError)
    return (
      <p className="text-center py-8 text-red-500">Failed to load {title}.</p>
    )

  return (
    <section className="my-8">
      <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data!.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 border rounded-full hover:bg-gray-100">
          View All
        </button>
      </div>
    </section>
  )
}
