import CategoryPage from '@/components/categoryPage'

const searchType = 'recipes'

export default function RecipePage() {
  return (
    <CategoryPage
      searchType={searchType}
      title={'DIY 레시피'}
      url={'diy-recipes'}
    />
  )
}
