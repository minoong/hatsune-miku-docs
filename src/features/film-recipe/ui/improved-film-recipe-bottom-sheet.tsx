import { useState, useEffect, useRef } from 'react';
import { FILM_RECIPES, type FilmRecipe } from '~/entities/film-recipe/model/types';
import { CompactFilmRecipeCard } from './compact-film-recipe-card';
import { ImprovedBottomSheet } from '~/shared/ui/bottom-sheet/improved-bottom-sheet';
import { Button } from '~/shared/ui/button/button';

interface ImprovedFilmRecipeBottomSheetProps {
  isOpen: boolean;
  selectedRecipe?: FilmRecipe | null;
  onRecipeSelect: (recipe: FilmRecipe | null) => void;
  onClose: () => void;
}

type CategoryType = 'all' | 'fuji' | 'kodak';

interface Category {
  key: CategoryType;
  label: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { key: 'all', label: '전체', color: 'bg-gray-100 text-gray-800' },
  { key: 'fuji', label: 'FUJI', color: 'bg-green-100 text-green-800' },
  { key: 'kodak', label: 'KODAK', color: 'bg-yellow-100 text-yellow-800' },
];

export const ImprovedFilmRecipeBottomSheet = ({ isOpen, selectedRecipe, onRecipeSelect, onClose }: ImprovedFilmRecipeBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('all');
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const recipeScrollRef = useRef<HTMLDivElement>(null);

  // 카테고리별 필터링
  const filteredRecipes = FILM_RECIPES.filter((recipe) => {
    if (activeTab === 'all') return true;
    return recipe.brand === activeTab;
  });

  // 현재 보이는 뷰포트의 필터 브랜드를 감지
  const [visibleBrand, setVisibleBrand] = useState<CategoryType>('all');

  useEffect(() => {
    const handleScroll = () => {
      if (!recipeScrollRef.current || activeTab !== 'all') return;

      const scrollElement = recipeScrollRef.current;
      const scrollLeft = scrollElement.scrollLeft;
      const elementWidth = scrollElement.offsetWidth;
      const scrollWidth = scrollElement.scrollWidth;

      // 스크롤 위치에 따라 보이는 브랜드 결정
      const scrollPercentage = scrollLeft / (scrollWidth - elementWidth);

      if (scrollPercentage < 0.3) {
        setVisibleBrand('fuji');
      } else if (scrollPercentage > 0.7) {
        setVisibleBrand('kodak');
      } else {
        setVisibleBrand('all');
      }
    };

    if (recipeScrollRef.current && activeTab === 'all') {
      recipeScrollRef.current.addEventListener('scroll', handleScroll);
      return () => recipeScrollRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [activeTab]);

  const handleRecipeSelect = (recipe: FilmRecipe) => {
    onRecipeSelect(recipe);
    onClose();
  };

  const handleClearSelection = () => {
    onRecipeSelect(null);
    onClose();
  };

  const getCategoryStyle = (category: Category) => {
    const isActive = activeTab === category.key;
    const isVisible = activeTab === 'all' && visibleBrand === category.key;

    if (isActive || isVisible) {
      return `${category.color} font-medium`;
    }
    return 'bg-gray-50 text-gray-600 hover:bg-gray-100';
  };

  return (
    <ImprovedBottomSheet isOpen={isOpen} onClose={onClose} maxHeight="60vh">
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">필름 레시피</h2>
          {selectedRecipe && (
            <Button variant="ghost" onClick={handleClearSelection} className="text-sm">
              초기화
            </Button>
          )}
        </div>

        {/* 카테고리 가로 스크롤 */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div ref={categoryScrollRef} className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveTab(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${getCategoryStyle(category)}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 레시피 스크롤 */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            {/* 기본 (레시피 없음) 옵션 */}
            <div className="mb-4">
              <div className="flex-shrink-0 w-20 mr-3">
                <div
                  onClick={() => handleClearSelection()}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${
                    !selectedRecipe ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <div className="h-16 bg-gradient-to-br from-gray-200 to-gray-400 relative flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>

                    {!selectedRecipe && (
                      <div className="absolute top-1 right-1">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-2.5 h-2.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-2 py-2">
                    <h3 className="text-xs font-medium text-gray-900 text-center leading-tight">원본</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* 필름 레시피들 */}
            {activeTab === 'all' ? (
              <>
                {/* FUJI 섹션 */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">FUJI</h3>
                  <div ref={recipeScrollRef} className="flex overflow-x-auto pb-2 scrollbar-hide">
                    {FILM_RECIPES.filter((recipe) => recipe.brand === 'fuji').map((recipe) => (
                      <CompactFilmRecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isSelected={selectedRecipe?.id === recipe.id}
                        onClick={() => handleRecipeSelect(recipe)}
                      />
                    ))}
                  </div>
                </div>

                {/* KODAK 섹션 */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">KODAK</h3>
                  <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                    {FILM_RECIPES.filter((recipe) => recipe.brand === 'kodak').map((recipe) => (
                      <CompactFilmRecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isSelected={selectedRecipe?.id === recipe.id}
                        onClick={() => handleRecipeSelect(recipe)}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-4">
                <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                  {filteredRecipes.map((recipe) => (
                    <CompactFilmRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isSelected={selectedRecipe?.id === recipe.id}
                      onClick={() => handleRecipeSelect(recipe)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ImprovedBottomSheet>
  );
};
