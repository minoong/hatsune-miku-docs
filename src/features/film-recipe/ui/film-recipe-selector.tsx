import { useState } from 'react';

import { FILM_RECIPES, type FilmRecipe } from '~/entities/film-recipe/model/types';
import { Button } from '~/shared/ui/button/button';
import type { Any } from '~/shared/model/global';

import { FilmRecipeCard } from './film-recipe-card';

interface FilmRecipeSelectorProps {
  selectedRecipe?: FilmRecipe | null;
  onRecipeSelect: (recipe: FilmRecipe | null) => void;
  onClose: () => void;
}

export const FilmRecipeSelector = ({ selectedRecipe, onRecipeSelect, onClose }: FilmRecipeSelectorProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fuji' | 'kodak'>('all');

  const filteredRecipes = FILM_RECIPES.filter((recipe) => {
    if (activeTab === 'all') return true;
    return recipe.brand === activeTab;
  });

  const handleRecipeSelect = (recipe: FilmRecipe) => {
    onRecipeSelect(recipe);
  };

  const handleClearSelection = () => {
    onRecipeSelect(null);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onClose} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h1 className="text-xl font-bold text-gray-900">필름 레시피</h1>
        </div>

        {selectedRecipe && (
          <Button variant="ghost" onClick={handleClearSelection} className="text-sm">
            초기화
          </Button>
        )}
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-8">
          {[
            { key: 'all', label: '전체' },
            { key: 'fuji', label: 'FUJI' },
            { key: 'kodak', label: 'KODAK' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Any)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 레시피 목록 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 pb-6">
          {/* 기본 (레시피 없음) 옵션 */}
          <div
            onClick={() => onRecipeSelect(null)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
              !selectedRecipe ? 'ring-2 ring-blue-500 scale-105 shadow-lg' : 'hover:scale-102 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-500 relative flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 text-white/80 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span className="text-white/90 text-sm font-medium">원본</span>
              </div>

              {!selectedRecipe && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="bg-white p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">필터 없음</h3>
              <p className="text-sm text-gray-600">원본 사진 그대로</p>
            </div>
          </div>

          {/* 필름 레시피들 */}
          {filteredRecipes.map((recipe) => (
            <FilmRecipeCard key={recipe.id} recipe={recipe} isSelected={selectedRecipe?.id === recipe.id} onClick={() => handleRecipeSelect(recipe)} />
          ))}
        </div>
      </div>
    </div>
  );
};
