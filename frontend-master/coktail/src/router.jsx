import { createBrowserRouter } from 'react-router-dom'

// layouts
import Layout from './components/layouts/default'

// default
import MainPage from './pages/main'

import SearchPage from './pages/search'
import SearchList from './pages/search/searchList'

import MyPage from './pages/mypage'
import LikeListMenu from './pages/mypage/LikeListMenu'
import LikeList from './pages/mypage/LikeList'
import MyActivity from './pages/mypage/Activity'
import MyRecipe from './pages/mypage/Recipe'
import ModifyMyRecipe from './pages/mypage/ModifyRecipe'
import MyReview from './pages/mypage/Review'

import RecipePage from './pages/recipes'
import RecipeRegister from './pages/recipes/recipeRegister'
import DIYRecipeDetailPage from './pages/recipes/recipeDetail'

import Cocktail from './pages/cocktails'
import CocktailDetailPage from './pages/cocktails/cocktailDetail'

import Reviews from './pages/reviews/Reviews'

import SurveyPage from './pages/survey'

import ChatPage from './pages/chat'

import MapPage from './pages/map'

import LoginPage from './pages/login'

import NotFoundPage from './pages/notFound'

// admin
import AdminLayout from './components/layouts/admin'
import AdminPage from './pages/admin'
import UserAdminPage from './pages/admin/UserAdminPage'
import ProductAdminPage from './pages/admin/ProductAdminPage'
import ReviewAdminPage from './pages/admin/ReviewAdminPage'
import RecipeAdminPage from './pages/admin/RecipeAdminPage'
import RegisterProduct from './pages/admin/RegisterProduct'
import BarAdminPage from './pages/admin/BarAdminPage'
import RegisterBar from './pages/admin/RegisterBar'
import BaseAdminPage from './pages/admin/BaseAdminPage'
import RegisterBase from './pages/admin/RegisterBase'
import EditProduct from './pages/admin/EditProduct'
import EditBase from './pages/admin/EditBase'
import EditBar from './pages/admin/EditBar'
import TestLoginPage from './pages/login/TestLogin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'search',
        element: null,
        children: [
          { path: '', element: <SearchPage /> },
          { path: 'list', element: <SearchPage /> },
        ],
      },
      {
        path: 'cocktails',
        element: null,
        children: [
          {
            path: '',
            element: <Cocktail />,
          },
          {
            path: ':id',
            element: <CocktailDetailPage />,
          },
        ],
      },
      {
        path: 'reviews',
        element: null,
        children: [
          {
            path: ':id',
            element: <Reviews />,
          },
        ],
      },
      {
        path: 'recipes',
        element: null,
        children: [
          {
            path: '',
            element: <RecipePage />,
          },
          {
            path: ':id',
            element: <DIYRecipeDetailPage />,
          },
          {
            path: 'register',
            element: <RecipeRegister />,
          },
        ],
      },
      {
        path: 'mypage',
        element: null,
        children: [
          {
            path: '',
            element: <MyPage />,
          },
          {
            path: 'likes',
            element: <LikeListMenu />,
          },
          {
            path: 'likes/list',
            element: <LikeList />,
          },
          {
            path: 'activities',
            element: <MyActivity />,
          },
          {
            path: 'recipes',
            element: null,
            children: [
              {
                path: '',
                element: <MyRecipe />,
              },
              {
                path: ':id',
                element: <ModifyMyRecipe />,
              },
            ],
          },
          {
            path: 'reviews',
            element: <MyReview />,
          },
        ],
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'survey',
        element: <SurveyPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'testLogin',
        element: <TestLoginPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminPage />,
      },
      {
        path: 'users',
        element: <UserAdminPage />,
      },
      {
        path: 'cocktails',
        element: <ProductAdminPage />,
      },
      {
        path: 'cocktails/register',
        element: <RegisterProduct />,
      },
      {
        path: 'cocktails/edit',
        element: <EditProduct />,
      },
      {
        path: 'reviews',
        element: <ReviewAdminPage />,
      },
      {
        path: 'recipes',
        element: <RecipeAdminPage />,
      },
      {
        path: 'bars',
        element: <BarAdminPage />,
      },
      {
        path: 'bars/register',
        element: <RegisterBar />,
      },
      {
        path: 'bars/edit',
        element: <EditBar />,
      },
      {
        path: 'bases',
        element: <BaseAdminPage />,
      },

      {
        path: 'bases/register',
        element: <RegisterBase />,
      },
      {
        path: 'bases/edit',
        element: <EditBase />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
])
