import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { getMeApi } from 'src/libs/apis/auth';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getMeApi();
      setData(data?.user);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5">
            <div className="row">
              <div className="col">
                <nav
                  aria-label="breadcrumb"
                  className="bg-light rounded-3 p-3 mb-4"
                >
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/profile">Thành viên</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Thông tin cá nhân
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: 150 }}
                    />
                    <h5 className="my-3">{data?.username || '...'}</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Họ tên</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {data?.fullname || '...'}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Số điện thoại</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data?.sdt || '...'}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Địa chỉ</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {data?.dia_chi || '...'}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">
                          <Link
                            to={routes.editProfile}
                            className="btn-small btn-primary"
                          >
                            Chỉnh sửa
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
