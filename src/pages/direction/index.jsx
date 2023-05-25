import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkDirection } from 'src/libs/apis/checkout';
import { actionToast } from 'src/store/authSlice';
import { actionResetCart } from 'src/store/cartSlice';
import webStorage from 'src/utils/webStorage';

const Direction = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkoutDirection = async () => {
      const type = webStorage.get('loai_thanh_toan');
      const data = webStorage.get('data_return');
      if (type && data) {
        const res = await checkDirection({
          type: type,
          data: data,
        });
        if (res?.status === 'success') {
          dispatch(
            actionToast({ title: 'Thanh toán thành công!', type: 'success' })
          );
          dispatch(actionResetCart());
          navigation('/');
        }
      }
    };
    checkoutDirection();
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Direction;
