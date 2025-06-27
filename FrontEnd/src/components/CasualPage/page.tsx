import styles from "./casualPage.module.css";
import ResponsiveFilterSidebar from "@/components/CasualPage/ResponsiveFilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";

export default function CasualPage() {
  return (
    <div className={styles.pageContainer}>
      <ResponsiveFilterSidebar isOpen={true} onClose={() => {}} />
      <div className={styles.mainContent}>
        <SortDropdown
          onFilterClick={() => {
            /* handle filter click here */
          }}
        />
        <div className={styles.productGrid}>{/* map sản phẩm tại đây */}</div>
        <Pagination />
      </div>
    </div>
  );
}
