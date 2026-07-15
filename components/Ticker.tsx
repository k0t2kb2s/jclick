const items = [
  "Приложите телефон",
  "Отзыв за 30 секунд",
  "Без приложений",
  "Работает с 2GIS и Google",
  "Без подписки",
  "Гарантия замены",
];

/* Лента-табличка между хиро и проблемой: повторяет доводы хиро,
   декоративна для скринридеров. Два одинаковых трека дают бесшовный цикл. */
export function Ticker() {
  return (
    <div className="ticker dark-section" aria-hidden="true">
      {[0, 1].map((track) => (
        <div className="ticker-track" key={track}>
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
