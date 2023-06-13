import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import {getArticles} from "../redux/actions/userAction";
import {Pagination} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, articles, totalCounts, currentPageNumber } = useSelector((state) => state.auth);
    const [articlesList, setArticlesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(1);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedSourceId, setSelectedSourceId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        setArticlesList(articles)
    }, [articles]);

    useEffect(() => {
        setCurrentPage(currentPageNumber);
        setTotalArticles(totalCounts);
    }, [currentPageNumber, totalCounts]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(getArticles(
            {
                nextPage: currentPage,
                sourceId: selectedSourceId,
                categoryId: selectedCategoryId,
                fromDate: fromDate,
                toDate: toDate
            })
        );
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

        if (!selectedCategoryId) {
            axiosInstance.get('api/category')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        dispatch(getArticles(
            {
                nextPage: currentPage,
                sourceId: selectedSourceId,
                categoryId: selectedCategoryId,
                fromDate: fromDate,
                toDate: toDate
            })
        );
    }, [selectedSourceId, selectedCategoryId, fromDate, toDate]);

  return (
      <div>
          <h2>Welcome, {`${user.name}`}!</h2>
          <p>This is your dashboard.</p>
          <LogoutButton />
          <hr />
          <div className="container">
              <select value={selectedSourceId} onChange={(e) => {
                  setSelectedSourceId(e.target.value)
              }}>
                  <option value="">All</option>
                  {
                      sources.map(source => (
                      <option key={source.id} value={source.id}>
                          {source.name}
                      </option>
                      ))
                  }
              </select>
              <select value={selectedCategoryId} onChange={(e) => {
                  setSelectedCategoryId(e.target.value)
              }}>
                  <option value="">All</option>
                  {
                      categories.map(category => (
                      <option key={category.id} value={category.id}>
                          {category.name}
                      </option>
                      ))
                  }
              </select>
              <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
              />

              <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
              />
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
                          <td>{articles.source ? articles.source.name : ''}</td>
                          <td>{articles.category ? articles.category.name : ''}</td>
                          <td>{articles.author ? articles.author.name : ''}</td>
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
