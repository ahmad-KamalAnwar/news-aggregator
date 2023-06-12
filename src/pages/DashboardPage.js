import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import {userPreference} from "../redux/actions/userAction";
import {Pagination} from "react-bootstrap";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, articles, totalCounts, currentPageNumber } = useSelector((state) => state.auth);
    const [articlesList, setArticlesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(1);

    useEffect(() => {
        dispatch(userPreference({nextPage: currentPage}));
    }, []);

    useEffect(() => {
        setArticlesList(articles)
    }, [articles]);

    useEffect(() => {
        setCurrentPage(currentPageNumber);
        setTotalArticles(totalCounts);
    }, [currentPageNumber, totalCounts]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(userPreference({nextPage: pageNumber}));
    };

  return (
      <div>
          <h2>Welcome, {`${user.name}`}!</h2>
          <p>This is your dashboard.</p>
          <LogoutButton />
          <hr />
          <div className="container">
              <table className="table table-striped">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Author ID</th>
                      <th>Category ID</th>
                      <th>Content</th>
                      <th>Description</th>
                      <th>Published At</th>
                      <th>Source ID</th>
                  </tr>
                  </thead>
                  <tbody>
                  {articlesList.map((articles) => (
                      <tr key={articles.id}>
                          <td>{articles.id}</td>
                          <td>{articles.author_id}</td>
                          <td>{articles.category_id}</td>
                          <td>{articles.content}</td>
                          <td>{articles.description}</td>
                          <td>{articles.published_at}</td>
                          <td>{articles.source_id}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              <Pagination>
                  {Array.from({ length: Math.ceil(totalArticles / 10) }).map((_, index) => (
                      <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                      >
                          {index + 1}
                      </Pagination.Item>
                  ))}
              </Pagination>
          </div>
      </div>
  );
};

export default Dashboard;
