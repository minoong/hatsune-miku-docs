import { useState } from 'react';

import { FILM_RECIPES, type FilmRecipe } from '~/entities/film-recipe/model/types';
import { BottomSheet } from '~/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '~/shared/ui/button/button';
import type { Any } from '~/shared/model/global';

import { FilmRecipeCardHorizontal } from './film-recipe-card-horizontal';

interface FilmRecipeBottomSheetProps {
  isOpen: boolean;
  selectedRecipe?: FilmRecipe | null;
  onRecipeSelect: (recipe: FilmRecipe | null) => void;
  onClose: () => void;
}

export const FilmRecipeBottomSheet = ({ isOpen, selectedRecipe, onRecipeSelect, onClose }: FilmRecipeBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fuji' | 'kodak'>('all');

  const filteredRecipes = FILM_RECIPES.filter((recipe) => {
    if (activeTab === 'all') return true;
    return recipe.brand === activeTab;
  });

  const handleRecipeSelect = (recipe: FilmRecipe) => {
    onRecipeSelect(recipe);
    onClose();
  };

  const handleClearSelection = () => {
    onRecipeSelect(null);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="필름 레시피" snapPoints={[0.6, 0.9]} initialSnap={0}>
      <div className="flex h-full flex-col">
        {/* 탭과 초기화 버튼 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <div className="flex space-x-6">
            {[
              { key: 'all', label: '전체' },
              { key: 'fuji', label: 'FUJI' },
              { key: 'kodak', label: 'KODAK' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as Any)}
                className={`border-b-2 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {selectedRecipe && (
            <Button variant="ghost" onClick={handleClearSelection} className="text-sm">
              초기화
            </Button>
          )}
        </div>

        {/* 레시피 스크롤 */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            {/* 기본 (레시피 없음) 옵션 */}
            <div className="mb-4">
              <h3 className="mb-3 text-sm font-medium text-gray-700">기본</h3>
              <div className="w-32 flex-shrink-0">
                <div
                  onClick={() => handleClearSelection()}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                    !selectedRecipe ? 'scale-105 shadow-lg ring-2 ring-blue-500' : 'shadow-md hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <div className="relative flex h-24 items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                    <div className="text-center">
                      <svg className="mx-auto mb-1 h-6 w-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <span className="text-xs font-medium text-white/90">원본</span>
                    </div>

                    {!selectedRecipe && (
                      <div className="absolute top-2 right-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                          <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                  <div className="bg-white p-3">
                    <h3 className="mb-1 text-sm leading-tight font-semibold text-gray-900">필터 없음</h3>
                    <p className="text-xs text-gray-600">원본 사진 그대로</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 필름 레시피들 */}
            {activeTab === 'all' ? (
              <>
                {/* FUJI 섹션 */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-700">FUJI</h3>
                  <div className="scrollbar-hide flex overflow-x-auto pb-4">
                    {FILM_RECIPES.filter((recipe) => recipe.brand === 'fuji').map((recipe) => (
                      <FilmRecipeCardHorizontal
                        key={recipe.id}
                        recipe={recipe}
                        isSelected={selectedRecipe?.id === recipe.id}
                        onClick={() => handleRecipeSelect(recipe)}
                      />
                    ))}
                  </div>
                </div>

                {/* KODAK 섹션 */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-700">KODAK</h3>
                  <div className="scrollbar-hide flex overflow-x-auto pb-4">
                    {FILM_RECIPES.filter((recipe) => recipe.brand === 'kodak').map((recipe) => (
                      <FilmRecipeCardHorizontal
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
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium text-gray-700">{activeTab.toUpperCase()}</h3>
                <div className="scrollbar-hide flex overflow-x-auto pb-4">
                  {filteredRecipes.map((recipe) => (
                    <FilmRecipeCardHorizontal
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
    </BottomSheet>
  );
};
