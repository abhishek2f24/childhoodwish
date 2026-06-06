'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { QUIZ_QUESTIONS, getQuizRecommendations } from '@/lib/quizLogic';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, cn } from '@/lib/utils';
import type { QuizAnswers, Product } from '@/types';

interface FindAGiftClientProps {
  products: Product[];
}

export default function FindAGiftClient({ products }: FindAGiftClientProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>('');
  const [showResults, setShowResults] = useState(false);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  const question = QUIZ_QUESTIONS[currentStep];
  const isMulti = question?.multiSelect;
  const progress = ((currentStep) / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    if (isMulti) {
      const current = (selectedOptions as string[]) || [];
      if (current.includes(value)) {
        setSelectedOptions(current.filter((v) => v !== value));
      } else {
        setSelectedOptions([...current, value]);
      }
    } else {
      setSelectedOptions(value);
    }
  };

  const isSelected = (value: string) => {
    if (isMulti) return (selectedOptions as string[]).includes(value);
    return selectedOptions === value;
  };

  const handleNext = () => {
    // Save answer
    const newAnswers = {
      ...answers,
      [question.id]: selectedOptions,
    } as QuizAnswers;
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedOptions(isMulti ? [] : '');
    } else {
      // Show results
      const ids = getQuizRecommendations(newAnswers as QuizAnswers);
      setRecommendedIds(ids);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setSelectedOptions('');
    }
  };

  const canProceed = isMulti
    ? (selectedOptions as string[]).length > 0
    : selectedOptions !== '';

  const recommendedProducts = products.filter((p) => recommendedIds.includes(p.id));
  const heroProduct = recommendedProducts[0];
  const altProducts = recommendedProducts.slice(1);

  if (showResults) {
    return (
      <div className="pt-16 min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-dark mb-3">
              Based on your answers, here's what we'd gift...
            </h1>
            <p className="text-muted text-lg">Curated by our nostalgia engine. ✨</p>
          </motion.div>

          {heroProduct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8 mb-8 ring-2 ring-primary"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                ⭐ Our top recommendation for you
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="aspect-square bg-gradient-to-br from-cream to-cream-dark rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">
                    {heroProduct.category === 'toys-games' ? '🎮' : heroProduct.category === 'gift-boxes' ? '🎁' : heroProduct.category === 'sports' ? '🏏' : '📚'}
                  </span>
                </div>
                <div>
                  <h2 className="font-fraunces text-2xl font-bold text-dark mb-3">{heroProduct.name}</h2>
                  <p className="font-caveat text-secondary italic text-lg mb-4">{heroProduct.memoryHook}</p>
                  <div className="text-3xl font-bold text-dark mb-6">{formatPrice(heroProduct.price)}</div>
                  <div className="flex gap-3">
                    <button onClick={() => addItem(heroProduct)} className="btn-primary">
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <Link href={`/product/${heroProduct.slug}`} className="btn-outline">
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {altProducts.length > 0 && (
            <div>
              <h3 className="font-fraunces text-xl font-bold text-dark mb-4">Alternatives you might love</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {altProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card p-4 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">
                        {p.category === 'toys-games' ? '🎮' : p.category === 'gift-boxes' ? '🎁' : '🏏'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-fraunces font-bold text-dark truncate">{p.name}</h4>
                      <p className="text-sm text-muted">{formatPrice(p.price)}</p>
                    </div>
                    <button onClick={() => addItem(p)} className="btn-primary text-sm px-3 py-2 flex-shrink-0">
                      Add
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => { setShowResults(false); setCurrentStep(0); setAnswers({}); setSelectedOptions(''); }} className="btn-outline">
              Retake quiz
            </button>
            <Link href="/cart" className="btn-secondary">
              View Cart <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted mb-2">
            <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-dark mb-8 leading-tight">
              {question.question}
            </h1>

            {isMulti && (
              <p className="text-sm text-muted mb-4 -mt-4">Select all that apply</p>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  id={`quiz-option-${option.value}`}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3',
                    isSelected(option.value)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-cream-darker bg-white hover:border-primary/40 hover:bg-cream text-dark'
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <div className="font-semibold">{option.label}</div>
                    {'sub' in option && option.sub && (
                      <div className="text-xs text-muted mt-0.5">{option.sub}</div>
                    )}
                  </div>
                  {isSelected(option.value) && (
                    <Check className="w-4 h-4 ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            id="quiz-back-btn"
            className="flex items-center gap-2 text-muted hover:text-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            id="quiz-next-btn"
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-200',
              canProceed
                ? 'bg-primary text-white hover:bg-primary-dark shadow-warm hover:-translate-y-0.5'
                : 'bg-cream-dark text-muted cursor-not-allowed'
            )}
          >
            {currentStep === QUIZ_QUESTIONS.length - 1 ? 'See my gift →' : 'Next'}
            {currentStep < QUIZ_QUESTIONS.length - 1 && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
