import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

const LISTSIZE = 10;

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = products?.length / LISTSIZE || 0;
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => setProducts(res?.data?.products || []));
  }, []);

  const pageHandler = (i) => {
    if (i >= 1 && i <= totalPages && i !== page) {
      setPage(i);
    }
  };

  return (
    <div className="App">
      <h1>Checkout our products</h1>
      {products?.length && (
        <div className="products">
          {products.slice(page * LISTSIZE - 10, page * LISTSIZE).map((item) => {
            return (
              <span key={item.id} className="products__single">
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}

      <div className="pagination">
        <span onClick={() => pageHandler(page - 1)}>◀</span>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <span
              key={i}
              onClick={() => pageHandler(i + 1)}
              className={page === i + 1 ? "pagination__selected" : ""}
            >
              {i + 1}
            </span>
          );
        })}
        <span onClick={() => pageHandler(page + 1)}>▶</span>
      </div>
    </div>
  );
}
