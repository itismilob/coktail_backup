import CategoryPage from '@/components/categoryPage'
const searchType = 'cocktails'

export default function CocktailPage() {
  return (
    <CategoryPage searchType={searchType} title={'칵테일'} url={'cocktails'} />
  )
}
