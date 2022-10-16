import styles from "./Paginator.module.scss";
import {useState} from "react";

export const Paginator = ({totalCount, usersCountOnPage, onChangePage, activePage}) => {

    let itemsCount = Math.ceil(totalCount / usersCountOnPage)

    let pages = []
    for (let i = 1; i <= itemsCount; i++) {
        pages.push(i)
    }

    let portionSize = 10
    const [portionID, setPortionID] = useState(1)
    let portionCount = Math.ceil(itemsCount / portionSize)
    let portionPosLeft = (portionID - 1) * portionSize + 1
    let portionPostRight = portionPosLeft + (portionSize - 1)

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {portionID > 1
                    ? <div className={styles.buttons}>
                        <button onClick={(e) => {setPortionID(1)}}>Start</button>
                        <button onClick={() => {setPortionID(portionID - 1) }}>Prev</button>
                    </div>
                    : <div className={styles.buttons}>
                        <button disabled onClick={(e) => {setPortionID(1)}}>Start</button>
                        <button disabled onClick={() => {setPortionID(portionID - 1)}}>Prev</button>
                    </div>
                }
                <div className={styles.pages}>
                {pages.filter(page => page >= portionPosLeft && page <= portionPostRight)
                    .map(page => (activePage === page)
                        ? <span onClick={(e) => {onChangePage(page)}} className={styles.activePage}>{page}</span>
                        : <span onClick={(e) => {onChangePage(page)}}>{page}</span> )
                    }
                </div>
                {portionID < portionCount
                    ? <div className={styles.buttons}>
                        <button onClick={() => { setPortionID(portionID + 1) }}>Next</button>
                        <button onClick={(e) => {setPortionID(portionCount)}}>End</button>
                    </div>
                    : <div className={styles.buttons}>
                        <button disabled onClick={() => { setPortionID(portionID + 1) }}>Next</button>
                        <button disabled onClick={(e) => {setPortionID(portionCount)}}>End</button>
                    </div>
                }

            </div>
        </div>
    )
}