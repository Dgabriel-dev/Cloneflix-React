import React, {useState} from "react";
import './MovieRow.css';


export default ({title, items}) => {
    const [scrollX, setsScrollX] = useState(-400)
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setsScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setsScrollX(x);
    }
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <h1>◀</h1>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <h1>▶</h1>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.lenght * 150
                }}>
                {items.results.length > 0 && items.results.map ((item, key) => (
                    <div key={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                    </div>
                        
                ))}        
                </div>
            </div>
        </div>
    )
}