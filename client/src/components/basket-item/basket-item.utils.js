import axios from 'axios'

export const RemoveFromCart = item => {
    const { _id } = item

    axios({
        method: 'post',
        url: `items/${_id}/remove`,
        data: {
          item: item
        }
      })
        .then(response => {
            console.log(response.data);
            removeFromCart(item);
        })
        .catch(error => {
            console.log(error);
        });
}

export const AddToCart = () => {
    const {_id} = cartItem

    axios({
        method: 'post',
        url: `items/${_id}/add`,
        data: {
          item: cartItem
        }
      })
        .then(response => {
            console.log(response.data);
            addToCart(cartItem);
        })
        .catch(error => {
            console.log(error);
        });
}