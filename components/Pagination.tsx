import styles from '../styles/Home.module.css'

interface Props {
    items: number
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
}

const Pagination = ({ items, pageSize, currentPage, onPageChange }: Props) => {
    const pagesCount: number = Math.ceil(items / pageSize) // 100/10

    if (pagesCount === 1) return null
    const pages: Array<number> = Array.from(
        { length: pagesCount },
        (_, i) => i + 1
    )

    return (
        <div className={styles.all}>
            <ul className={styles.pagination}>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? styles.pageItemActive
                                : styles.pageItem
                        }
                    >
                        <a
                            className={styles.pageLink}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
