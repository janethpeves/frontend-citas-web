import React, { useState } from 'react';
import styles from './DataTable.module.css';
import deleteIcon from "@/assets/icons/deleteTrash.svg"
import editIcon from "@/assets/icons/editBtn.svg"
import eyeIcon from "@/assets/icons/eyeIcon.svg"

interface Column {
    header: string;
    field?: string;
    body?: (row: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    paginator?: boolean;
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
    onPageChange?: (page: number, rows: number) => void;
    totalRecords?: number;
    error: string | null;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onView, onEdit, onDelete, rowsPerPageOptions = [5, 10, 25], defaultRowsPerPage = 10, onPageChange, totalRecords, paginator, error }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(defaultRowsPerPage || 10)

    const totalPages = Math.ceil(totalRecords ? totalRecords / rowsPerPage : data.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = data.slice(startIndex, endIndex)

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            onPageChange && onPageChange(currentPage - 1, rowsPerPage)
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            onPageChange?.(currentPage + 1, rowsPerPage)
        }
    }

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            onPageChange?.(pageNumber, rowsPerPage);
        }
    };

    const handleRowsPerpage = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = Number(evt.target.value)
        setRowsPerpage(newRowsPerPage)
        setCurrentPage(1)
        onPageChange?.(1, newRowsPerPage);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.sectionStructure}>
            <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                            {(onView || onEdit || onDelete) && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.body ? col.body(row) : row[col.field || '']}
                                        </td>
                                    ))}
                                    {(onView || onEdit || onDelete) && (
                                        <td>
                                            <div className={styles.btnContainer}>
                                                {onView && (
                                                    <button
                                                        className={styles.actionButton}
                                                        onClick={() => onView(row)}
                                                        title="Ver"
                                                    >
                                                        <img src={eyeIcon} alt="Ver" />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        className={styles.actionButton}
                                                        onClick={() => onEdit(row)}
                                                        title="Editar"
                                                    >
                                                        <img src={editIcon} alt="Editar" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        className={styles.actionButton}
                                                        onClick={() => onDelete(row)}
                                                        title="Eliminar"
                                                    >
                                                        <img src={deleteIcon} alt="Eliminar" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} className={styles.noData}>
                                    No se encontró información
                                </td>
                            </tr>
                        )}
                        {
                            error && (
                                <tr>
                                    <td colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} className={styles.error}>
                                        {error}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {
                data.length > 0 && paginator
                    ? (
                        <div className={styles.paginationContainer}>
                            <div className={styles.rowsPerPage}>
                                <label>Filas por página:</label>
                                <select value={rowsPerPage} onChange={handleRowsPerpage}>
                                    {rowsPerPageOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.pageNumbers}>
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className={styles.paginationButton}
                                >
                                    Anterior
                                </button>
                                {totalPages > 1 && renderPageNumbers()}
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={styles.paginationButton}
                                >
                                    Siguiente
                                </button>
                            </div>
                            <p className={styles.totalRecords}>
                                Mostrando {(currentPage - 1) * rowsPerPage + 1} -{' '}
                                {Math.min(currentPage * rowsPerPage, (totalRecords || 0))} de {totalRecords}
                            </p>
                        </div>
                    )
                    : null
            }
        </div>
    );
};


export default DataTable;
