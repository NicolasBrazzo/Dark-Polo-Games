import { useMemo, useState } from "react";

export const ListRappers = ({
  rappers,
  isModDel,
  removedRapper,
  setRemovedRapper,
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  const max = 20;

  const randomRappers = useMemo(() => {
    const shuffled = [...rappers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, max);
  }, [rappers, max]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 mx-5 gap-2">
      {randomRappers.map((rapper) => {
        const isRemoved = removedRapper.includes(rapper.id);

        return (
          <div
            key={rapper.id}
            className={`${
              isRemoved ? "rapper-removed" : "card"
            } relative cursor-pointer group`}
            onMouseEnter={() => setHoveredId(rapper.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {isModDel && hoveredId === rapper.id && (
              <div className="absolute inset-0 bg-red-300/20 backdrop-blur-[2px] rounded-2xl z-30 flex items-center justify-center transition-opacity duration-300">
                <button
                  className="btn-red"
                  onClick={() => {
                    setRemovedRapper(
                      (prev) =>
                        isRemoved
                          ? prev.filter((elem) => elem !== rapper.id) // se è già rimosso, lo tolgo
                          : [...prev, rapper.id] // altrimenti lo aggiungo
                    );
                  }}
                >
                  {isRemoved ? "Aggiungi" : "Elimina"}
                </button>
              </div>
            )}

            <div className="relative z-20 flex flex-col items-center justify-center">
              <div className="rapper-container mb-2">
                <img src={rapper.img} alt={rapper.name} />
              </div>
              <h3 className="rapper-name text-white font-bold text-lg tracking-wide">
                {rapper.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
