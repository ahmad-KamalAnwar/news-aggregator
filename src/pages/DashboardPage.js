import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import {userPreference} from "../redux/actions/userAction";
import {Pagination} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, articles, totalCounts, currentPageNumber } = useSelector((state) => state.auth);
    const [articlesList, setArticlesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(1);
    const [sources, setSources] = useState([]);
    const [selectedSourceId, setSelectedSourceId] = useState('');

    useEffect(() => {
        setArticlesList(articles)
    }, [articles]);

    useEffect(() => {
        setCurrentPage(currentPageNumber);
        setTotalArticles(totalCounts);
    }, [currentPageNumber, totalCounts]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(userPreference({nextPage: currentPage, sourceId: selectedSourceId}));
    };

    useEffect(() => {
        if (!selectedSourceId) {
            axiosInstance.get('api/source')
                .then(response => {
                    setSources(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        dispatch(userPreference({nextPage: currentPage, sourceId: selectedSourceId}));
    }, [selectedSourceId]);

  return (
      <div>
          <h2>Welcome, {`${user.name}`}!</h2>
          <p>This is your dashboard.</p>
          <LogoutButton />
          <hr />
          <div className="container">
              <select value={selectedSourceId} onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedSourceId(e.target.value)
              }}>
                  <option value="">All</option>
                  {sources.map(source => (
                      <option key={source.id} value={source.id}>
                          {source.name}
                      </option>
                  ))}
              </select>
              <table className="table table-striped">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Content</th>
                      <th>Description</th>
                      <th>Source</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Published At</th>
                  </tr>
                  </thead>
                  <tbody>
                  {articlesList.map((articles) => (
                      <tr key={articles.id}>
                          <td>{articles.id}</td>
                          <td>{articles.content}</td>
                          <td>{articles.description}</td>
                          <td>{articles.source.name ?? ''}</td>
                          <td>{articles.category.name ?? ''}</td>
                          <td>{articles.author.name ?? ''}</td>
                          <td>{articles.published_at}</td>
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
