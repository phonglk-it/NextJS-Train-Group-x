import styles from "./casualPage.module.css";
import FilterSidebar from "@/components/CasualPage/FilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";

export default function CasualPage() {
  return (
    <div className={styles.pageContainer}>
      <FilterSidebar />
      <div className={styles.mainContent}>
        <SortDropdown />
        <div className={styles.productGrid}>
          {/* map sản phẩm tại đây */}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
