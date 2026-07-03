import React, { Suspense } from "react";
import type { CartItem, Fish } from "../../types";

// AiConfigurator (377 строк) раньше импортировался статически, а
// GlobalConfigurator рендерится на home/catalog/quiz практически на каждом
// экране (просто с open=false) — то есть весь код AI-конфигуратора попадал
// в главный бандл ещё до того, как пользователь хоть раз его открыл.
// React.lazy откладывает загрузку чанка до первого реального открытия
// (open=true), а <Suspense> ниже показывает лёгкий фолбэк, пока чанк грузится.
const AiConfigurator = React.lazy(() =>
  import("./AiConfigurator").then((m) => ({ default: m.AiConfigurator }))
);

// AiConfigurator отдаёт в onApply(plan.fish) рыб с доп. полем `qty` (сколько
// штук этого вида взять) — самого поля `qty` в типе Fish нет, оно возникает
// только внутри плана конфигуратора, поэтому расширяем локально.
type ConfiguredFish = Fish & { qty?: number };

export interface GlobalConfiguratorProps {
  open: boolean;
  onClose: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  /** Доп. действие после применения плана — например, переход на выбор
   *  города, если конфигуратор был открыт ещё до того, как регион выбран
   *  (см. вызов из экрана quiz). Для home/catalog не передаётся — там после
   *  применения просто остаёмся на месте. */
  onApplied?: () => void;
}

/**
 * Раньше это был блок вида
 *   {configuratorOpen && <AiConfigurator onClose={...} onApply={(fishList) => {
 *     ...развернуть qty...; setCart(...); setConfiguratorOpen(false);
 *   }} />}
 * скопированный почти дословно в трёх местах App.tsx (quiz/home/catalogHome).
 * Логика "развернуть план в плоский список товаров и докинуть в корзину"
 * была общей везде; отличалось только то, нужно ли после применения ещё
 * и сменить экран (это делает quiz через onApplied). Теперь один компонент,
 * общая логика в одном месте, различие — явный проп, а не скопированный код.
 */
export function GlobalConfigurator({ open, onClose, setCart, onApplied }: GlobalConfiguratorProps) {
  if (!open) return null;

  return (
    <Suspense fallback={<ConfiguratorLoadingFallback />}>
      <AiConfigurator
        onClose={onClose}
        onApply={(fishList: ConfiguredFish[]) => {
          const expanded = fishList.flatMap((f) => Array.from({ length: f.qty || 1 }, () => f));
          setCart((c) => [...c, ...expanded]);
          onClose();
          onApplied?.();
        }}
      />
    </Suspense>
  );
}

// Минимальный фолбэк на время загрузки чанка AiConfigurator — сам компонент
// открывается поверх текущего экрана (модалка), так что фолбэк должен вести
// себя так же, иначе на секунду загрузки будет видно "дыру" в интерфейсе.
function ConfiguratorLoadingFallback() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#08131F", display: "flex", alignItems: "center", justifyContent: "center", color: "#6C8E96", fontSize: 14 }}>
      Загружаем AI-конфигуратор…
    </div>
  );
}
