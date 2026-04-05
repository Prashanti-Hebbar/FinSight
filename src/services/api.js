export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const raw = localStorage.getItem("finance-data");

        if (!raw) {
          resolve([]);
          return;
        }

        const data = JSON.parse(raw);

        // basic validation
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        resolve(data);
      } catch (error) {
        console.error("Fetch error:", error);
        reject(error);
      }
    }, 500); // cleaner UX delay
  });
};