# movie-api-example
Movie API 
- NodeJS 
- MongoDB
- Pug
- Mocha, Chai



# Movies

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | Tüm filmleri listele. |
| /api/movies | `POST` | {'title':'Kibar Feyzo', 'category':'Komedi', 'country':'Türkiye', year:1978, director:"id", imdb_score: 9.7 } | Yeni bir film oluştur. |
| /api/movies/:movie_id | `GET` | Empty | Id'ye göre film bul. |
| /api/movies/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Id'ye göre bulduğun filmi güncelle. |
| /api/movies/:movie_id | `DELETE` | Empty | Id'ye göre film sil. |
| /api/movies/top10 | `GET` | Empty | En iyi 10 filmi listele. |
| /api/movies/between/:start_year/:end_year | `GET` | Empty | İki tarih arasındaki filmleri listele. |

# Directors

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | Tüm yönetmenleri listele. |
| /api/directors | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Yeni bir yönetmen oluştur. |
| /api/directors/:director_id | `GET` | Empty | Id'ye göre yönetmeni bul. |
| /api/directors/:director_id | `PUT` | {'name':'Atıf', 'surname':'Yılmaz', 'bio': 'Türk yönetmen'} | Id'ye göre bulduğun yönetmenin bilgilerini güncelle. |
| /api/directors/:director_id | `DELETE` | Empty | Id'ye göre bulduğun yönetmeni sil. |
| /api/directors/:director_id/best10movie | `GET` | Empty | Id'ye göre bulduğun yönetmenin en iyi 10 filmini listele. |



# Hata Kodları
Alınan hatalardaki kodlar (Http Status vb. hariç)

| Error Code   | Description   |
|---|---|
| 10   | The movie was not found (Film bulunamadı).   |
| 11   | The director was not found (Film bulunamadı).   |
| 20   | Authentication failed, user not found (Doğrulama hatası, kullanıcı bulunamadı).   |
| 21   | Authentication failed, wrong password (Doğrulama hatası, yanlış şifre girdiniz).   |
| 22   | No token provided (Sağlanan kimlik yok).  |
| 23   | Failed to authenticate token (Kimlik doğrulaması başarısız oldu).  |


