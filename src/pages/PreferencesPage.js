import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import axiosInstance from '../api/axiosInstance';

const Preference = () => {
    const dispatch = useDispatch();
    const { user, articles, totalCounts, currentPageNumber } = useSelector((state) => state.auth);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [userPreferences, setUserPreferences] = useState([]);

    const getSources = () => {
        axiosInstance
            .get('api/source')
            .then(response => {
                setSources(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getCategories = () => {
        axiosInstance
            .get('api/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getAuthors = () => {
        axiosInstance
            .get('api/author')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getUserPreferences = () => {
        axiosInstance
            .get('api/user/preferences')
            .then(response => {
                console.log(response.data);
                setUserPreferences(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const findId = (key, id) => {
        if (userPreferences[key]) {
            for (const itr of userPreferences[key]) {
                if (parseInt(itr) === id) {
                    return true;
                }
            }
        }

        return false;
    };

    const updatePreferences = (e, key, id) => {
        const checked = e.target.checked;
        const updatedObject = { ...userPreferences };

        if (checked) {
            updatedObject[key] = [...updatedObject[key], id];
        } else {
            updatedObject[key] = updatedObject[key].filter((item) => item != id);
            console.log(updatedObject[key]);
        }

        setUserPreferences(updatedObject);
    };

    const submitPreferences = () => {
        axiosInstance.post('/api/user/preferences', userPreferences).then((response) => {
            console.log(response.data);
        });
    };

    useEffect(() => {
        getSources();
        getCategories();
        getAuthors();
        getUserPreferences();
    }, []);

    return (
      <div>
          <h2>Welcome, {`${user.name}`}!</h2>
          <p>This are your Settings.</p>
          <LogoutButton />
          <button className="btn btn-primary mt-2 float-end" onClick={submitPreferences}>Save</button>
          <hr />
          <div>
              <label>Sources:</label>
              {
                  sources.map(source => {
                      const isChecked = findId('sources', source.id);

                      return(
                          <div>
                              <input type={"checkbox"} checked={isChecked}
                                     onChange={(e) => {updatePreferences(e, 'sources', source.id)}}
                              />
                              <span style={{marginLeft: "1rem"}} key={source.id}>
                                  {source.name}
                              </span>
                          </div>
                      )})
                  }
          </div>

          <div>
              <label>Categories:</label>
              {
                  categories.map(category => {
                      const isChecked = findId('categories', category.id);

                      return(
                          <div>
                              <input type={"checkbox"} checked={isChecked}
                                     onChange={(e) => {updatePreferences(e, 'categories', category.id)}}
                              />
                              <span style={{marginLeft: "1rem"}} key={category.id}>
                                  {category.name}
                              </span>
                          </div>
                      )})
              }
          </div>

          <div>
              <label>Authors:</label>
              {
                  authors.map(author => {
                      const isChecked = findId('authors', author.id);

                      return(
                          <div>
                              <input type={"checkbox"} checked={isChecked}
                                     onChange={(e) => {updatePreferences(e, 'authors', author.id)}}
                              />
                              <span style={{marginLeft: "1rem"}} key={author.id}>
                                  {author.name}
                              </span>
                          </div>
                      )})
              }
          </div>
      </div>
  );
};

export default Preference;
