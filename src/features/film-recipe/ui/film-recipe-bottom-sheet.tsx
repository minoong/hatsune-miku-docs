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
      <div className="flex flex-col h-full">
        {/* 탭과 초기화 버튼 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex space-x-6">
            {[
              { key: 'all', label: '전체' },
              { key: 'fuji', label: 'FUJI' },
              { key: 'kodak', label: 'KODAK' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as Any)}
                className={`py-2 text-sm font-medium border-b-2 transition-colors ${
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
              <h3 className="text-sm font-medium text-gray-700 mb-3">기본</h3>
              <div className="flex-shrink-0 w-32">
                <div
                  onClick={() => handleClearSelection()}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                    !selectedRecipe ? 'ring-2 ring-blue-500 scale-105 shadow-lg' : 'hover:scale-105 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="h-24 bg-gradient-to-br from-gray-300 to-gray-500 relative flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-6 h-6 text-white/80 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <span className="text-white/90 text-xs font-medium">원본</span>
                    </div>

                    {!selectedRecipe && (
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">필터 없음</h3>
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
                  <h3 className="text-sm font-medium text-gray-700 mb-3">FUJI</h3>
                  <div className="flex overflow-x-auto pb-4 scrollbar-hide">
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
                  <h3 className="text-sm font-medium text-gray-700 mb-3">KODAK</h3>
                  <div className="flex overflow-x-auto pb-4 scrollbar-hide">
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
                <h3 className="text-sm font-medium text-gray-700 mb-3">{activeTab.toUpperCase()}</h3>
                <div className="flex overflow-x-auto pb-4 scrollbar-hide">
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
