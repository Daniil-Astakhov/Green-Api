export const useGetMessage = (id, api, callback) => {
  const deleteNotification = async (receiptId) => {
    const url = `https://api.green-api.com/waInstance${id}/deleteNotification/${api}/${receiptId}`;
    try {
      await fetch(url, {
        method: 'DELETE'
      });

    } catch (error) {
      console.log(error);
    }
  };
  
  const receiveNotification = async () => {
      const url = `https://api.green-api.com/waInstance${id}/receiveNotification/${api}`;          
      try {
      const response = await fetch(url);
      await response.json().then(data => {
        deleteNotification(data.receiptId);
        callback(data.body);
        
      }).catch()
      } catch (error) {}
  };
  receiveNotification();
};