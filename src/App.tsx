import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type TextFormat =
  | 'Пост для соцсетей'
  | 'Рекламное объявление'
  | 'Описание товара'
  | 'Деловое письмо'

type Tone =
  | 'Дружелюбный'
  | 'Экспертный'
  | 'Деловой'
  | 'Вдохновляющий'

const formatIntroductions: Record<TextFormat, string> = {
  'Пост для соцсетей':
    'Хотите получить больше пользы и уверенно двигаться к результату?',
  'Рекламное объявление':
    'Решение, которое помогает экономить время и достигать большего.',
  'Описание товара':
    'Представляем продукт, созданный для удобства, эффективности и заметного результата.',
  'Деловое письмо':
    'Предлагаем рассмотреть возможности взаимовыгодного сотрудничества.',
}

const toneEndings: Record<Tone, string> = {
  Дружелюбный:
    'Будем рады рассказать подробнее и ответить на ваши вопросы!',
  Экспертный:
    'Продуманная стратегия и внимание к деталям позволяют получить устойчивый результат.',
  Деловой:
    'Свяжитесь с нами, чтобы обсудить условия и дальнейшие шаги.',
  Вдохновляющий:
    'Начните действовать сегодня — новые возможности уже рядом!',
}

function App() {
  const [business, setBusiness] = useState('')
  const [details, setDetails] = useState('')
  const [format, setFormat] =
    useState<TextFormat>('Пост для соцсетей')
  const [tone, setTone] = useState<Tone>('Дружелюбный')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generateText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!business.trim() || !details.trim()) {
      setError('Заполните название бизнеса и тему с преимуществами.')
      setResult('')
      setCopied(false)
      return
    }

    const generatedText = `${formatIntroductions[format]}

    ${business.trim()} — это ${details.trim()}
    
    Мы помогаем клиентам принимать взвешенные решения, получать понятную пользу и уверенно достигать поставленных целей.
    
    ${toneEndings[tone]}`
    
        setError('')
        setResult(generatedText)
        setCopied(false)
      }
    
      const copyResult = async () => {
        if (!result) return
    
        await navigator.clipboard.writeText(result)
        setCopied(true)
    
        window.setTimeout(() => {
          setCopied(false)
        }, 2000)
      }
    
      const clearForm = () => {
        setBusiness('')
        setDetails('')
        setFormat('Пост для соцсетей')
        setTone('Дружелюбный')
        setResult('')
        setError('')
        setCopied(false)
      }
    
      return (
        <main className="app-shell">
          <section className="hero">
            <span className="hero-badge">AI-инструмент для бизнеса</span>
            <h1>Нейро-копирайтер для бизнеса</h1>
            <p>
              Создавайте основу для рекламных, деловых и информационных
              текстов за несколько секунд.
            </p>
          </section>
    
          <div className="workspace">
            <form className="generator-card" onSubmit={generateText}>
              <div className="section-heading">
                <span>01</span>
                <div>
                  <h2>Опишите задачу</h2>
                  <p>Заполните параметры будущего текста</p>
                </div>
              </div>
    
              <label>
                Название бизнеса или продукта
                <input
                  type="text"
                  value={business}
                  onChange={(event) => setBusiness(event.target.value)}
                  placeholder="Например: яхтенная школа «Мечта»"
                />
              </label>
    
              <label>
                Тема и ключевые преимущества
                <textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="Опишите предложение, пользу и важные особенности"
                  rows={6}
                />
              </label>
    
              <div className="select-grid">
                <label>
                  Формат текста
                  <select
                    value={format}
                    onChange={(event) =>
                      setFormat(event.target.value as TextFormat)
                    }
                  >
                    <option>Пост для соцсетей</option>
                    <option>Рекламное объявление</option>
                    <option>Описание товара</option>
                    <option>Деловое письмо</option>
                  </select>
                </label>
    
                <label>
                  Тон текста
                  <select
                    value={tone}
                    onChange={(event) => setTone(event.target.value as Tone)}
                  >
                    <option>Дружелюбный</option>
                    <option>Экспертный</option>
                    <option>Деловой</option>
                    <option>Вдохновляющий</option>
                  </select>
                </label>
              </div>
    
              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}
    
              <div className="actions">
                <button className="primary-button" type="submit">
                  Создать текст
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={clearForm}
                >
                  Очистить
                </button>
              </div>
            </form>
    
            <section className="result-card" aria-live="polite">
              <div className="section-heading">
                <span>02</span>
                <div>
                  <h2>Готовый материал</h2>
                  <p>Результат появится в этом окне</p>
                </div>
              </div>
    
              {result ? (
                <div className="generated-text">
                  <span className="result-label">
                    {format} · {tone} тон
                  </span>
    
                  <p>{result}</p>
    
                  <div className="result-tools">
                    <span className="character-count">
                      {result.length} символов
                    </span>
    
                    <button
                      className="copy-button"
                      type="button"
                      onClick={copyResult}
                    >
                      {copied ? '✓ Скопировано' : 'Копировать текст'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">✦</div>
                  <h3>Текст пока не создан</h3>
                  <p>Заполните форму и нажмите «Создать текст».</p>
                </div>
              )}
            </section>
          </div>
    
          <footer>
            Учебный MVP · React + TypeScript + Vite
          </footer>
        </main>
      )
    }
    
    export default App