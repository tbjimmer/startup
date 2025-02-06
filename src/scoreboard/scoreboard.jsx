import React from 'react';
import './scoreboard.css';

export function Scoreboard () {
    return (
        <div className="container">
            <h2>Scoreboard</h2>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>User</th>
                        <th>Crates Opened</th>
                        <th>Rare</th>
                        <th>Very Rare</th>
                        <th>Import</th>
                        <th>Exotic</th>
                        <th>Black Market</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Player3</td>
                        <td>111</td>
                        <td>68</td>
                        <td>30</td>
                        <td>8</td>
                        <td>4</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Player1</td>
                        <td>88</td>
                        <td>50</td>
                        <td>27</td>
                        <td>7</td>
                        <td>3</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Player2</td>
                        <td>55</td>
                        <td>34</td>
                        <td>15</td>
                        <td>4</td>
                        <td>2</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Player4</td>
                        <td>22</td>
                        <td>16</td>
                        <td>5</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}