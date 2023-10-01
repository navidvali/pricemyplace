from django.shortcuts import render
from retrievedata.models import Places
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn import tree
from matplotlib import pyplot as plt
from datetime import datetime
import numpy as np
from sklearn import metrics
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
import io
import base64

@api_view(['GET', 'POST'])
def guess_the_price_api(request):
    if request.method == "POST":
        data_dict = json.loads(request.body)
        # print(data_dict)
        places = []
        prices = []
        all_places = Places.objects.all()
        for i in all_places:
            places.append([int(i.meters), int(i.year), int(i.rooms), int(i.floor)])
            prices.append(i.price)

        x_train, x_test, y_train, y_test = train_test_split(places, prices, test_size=0.3, random_state=1)

        scaler = StandardScaler()
        x_train_s = scaler.fit_transform(x_train)

        forest = RandomForestRegressor(max_depth=4, n_estimators=200)
        forest.fit(x_train_s, y_train)

        meter = data_dict['meters']
        year = data_dict['year']
        room = data_dict['rooms']
        floor = data_dict['floor']
        try:
            new_data = [[int(meter), int(year), int(room), int(floor)]]
        except:
            return Response({"status": False, "msg": "invalid input!"})
        x_test_s = scaler.transform(x_test)
        # print(forest.score(x_test_s, y_test))

        ans = int(forest.predict(new_data))
        ans = str(ans)[::-1]
        num = len(ans)
        ans = list(ans)
        for i in range(len(ans) // 3, 0, -1):
            ans.insert(i * 3, ",")
        if num % 3 == 0:
            ans = "".join(ans[::-1][1:])
        else:
            ans = "".join(ans[::-1])

        pred = forest.predict(x_test)
        # print('Mean Absolute Error (MAE):', metrics.mean_absolute_error(y_test, pred))
        # print('Mean Squared Error (MSE):', metrics.mean_squared_error(y_test, pred))
        # print('Root Mean Squared Error (RMSE):', np.sqrt(metrics.mean_squared_error(y_test, pred)))
        mape = np.mean(np.abs((y_test - pred) / np.abs(y_test)))
        # print('Mean Absolute Percentage Error (MAPE):', round(mape * 100, 2))
        # print('Accuracy:', round(100 * (1 - mape), 2))
        return Response({"price": ans, "status": True, "msg": ""})

    return Response({"status": False, "msg": "usage: POST"})


@api_view(['POST'])
def costume_guess_the_price_api(request):
    if request.method == "POST":
        data_dict = json.loads(request.body)
        # print(data_dict)

        try:
            tst_size = int(data_dict['tst_size']) / 100
            rnd_state = int(data_dict['rnd_state'])
            dt_volume = int(data_dict['dt_volume'])
            max_depth = int(data_dict['max_depth'])
            n_estimators = int(data_dict['n_estimators'])
        except:
            return Response({"status": False, "msg": "invalid input!"})

        try:
            places = []
            prices = []
            all_places = Places.objects.all().order_by('-created_on')[:dt_volume]
            for i in all_places:
                places.append([int(i.meters), int(i.year), int(i.rooms), int(i.floor)])
                prices.append(i.price)

            x_train, x_test, y_train, y_test = train_test_split(places, prices, test_size=tst_size, random_state=rnd_state)

            scaler = StandardScaler()
            x_train_s = scaler.fit_transform(x_train)

            forest = RandomForestRegressor(max_depth=max_depth, n_estimators=n_estimators)
            forest.fit(x_train_s, y_train)

            x_test_s = scaler.transform(x_test)
            score = forest.score(x_test_s, y_test)
            # print(score)

            plt.figure(figsize=(200, 200), facecolor='#222222')
            tree.plot_tree(forest.estimators_[0], feature_names=["meters", "year", "price", "rooms"], filled=True)
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png')
            buffer.seek(0)

            # Encode the plot as base64 string
            plot_data = base64.b64encode(buffer.getvalue()).decode()

            pred = forest.predict(x_test)
            MSE = metrics.mean_squared_error(y_test, pred)
            MAE = metrics.mean_absolute_error(y_test, pred)
            RMSE = np.sqrt(metrics.mean_squared_error(y_test, pred))
            mape = np.mean(np.abs((y_test - pred) / np.abs(y_test)))
            MAPE = round(mape * 100, 2)
            Accuracy = round(100 * (1 - mape), 2)

            # print('Mean Absolute Error (MAE):', metrics.mean_absolute_error(y_test, pred))
            # print('Mean Squared Error (MSE):', metrics.mean_squared_error(y_test, pred))
            # print('Root Mean Squared Error (RMSE):', np.sqrt(metrics.mean_squared_error(y_test, pred)))
            # print('Mean Absolute Percentage Error (MAPE):', round(mape * 100, 2))
            # print('Accuracy:', round(100 * (1 - mape), 2))
            plt.figure().clear()
            plt.cla()
            plt.clf()
        except:
            return Response({"status": False, "msg": "something went wrong!"})
        res = {
            "status": True,
            "msg": "ok",
            "plot_data": plot_data,
            "score": score,
            "MSE": MSE,
            "MAE": MAE,
            "RMSE": RMSE,
            "MAPE": MAPE,
            "Accuracy": Accuracy,
            "tst_size": tst_size,
            "rnd_state": rnd_state,
            "dt_volume": dt_volume,
            "max_depth": max_depth,
            "n_estimators": n_estimators,
        }

        return Response(res)

    return Response({"valid": False})


# def guess_the_price(request):
#     if request.method == "POST":
#         places = []
#         prices = []
#         all_places = Places.objects.all()
#         for i in all_places:
#             places.append([int(i.meters), int(i.year), int(i.rooms), int(i.floor)])
#             prices.append(i.price)
#
#         x_train, x_test, y_train, y_test = train_test_split(places, prices, test_size=0.3, random_state=1)
#
#         scaler = StandardScaler()
#         x_train_s = scaler.fit_transform(x_train)
#
#         forest = RandomForestRegressor(max_depth=4, n_estimators=200)
#         forest.fit(x_train_s, y_train)
#
#         # forest_best = RandomForestRegressor()
#         # param_grid = {
#         #     "n_estimators": [200, 300, 400, 500],
#         #     "min_samples_split": [2, 4],
#         #     "max_depth": [None, 4, 8],
#         # }
#         # grid_search = GridSearchCV(forest_best, param_grid, cv=5,
#         #                            scoring="neg_mean_squared_error",
#         #                            return_train_score=True)
#         # grid_search.fit(x_train_s, y_train)
#
#         meter = request.POST.get('meter')
#         year = request.POST.get('year')
#         room = request.POST.get('room')
#         floor = request.POST.get('floor')
#         new_data = [[int(meter), int(year), int(room), int(floor)]]
#
#         x_test_s = scaler.transform(x_test)
#         print(forest.score(x_test_s, y_test))
#         print(grid_search.best_estimator_.score(x_test_s, y_test))
#         # print(grid_search.best_estimator_)
#         # 0.6651063454221304
#         # RandomForestRegressor(max_depth=4, n_estimators=200)
#
#         ans = int(forest.predict(new_data))
#         ans = str(ans)[::-1]
#         num = len(ans)
#         ans = list(ans)
#         for i in range(len(ans) // 3, 0, -1):
#             ans.insert(i * 3, ",")
#         if num % 3 == 0:
#             ans = "".join(ans[::-1][1:])
#         else:
#             ans = "".join(ans[::-1])
#         plt.figure(figsize=(100, 100), facecolor='#222222')
#         tree.plot_tree(forest.estimators_[0], feature_names=["meters", "year", "price", "rooms"], filled=True)
#         plt.savefig(f'main.png')
#         # plt.show()
#         # print(123)
#         pred = forest.predict(x_test)
#         print('Mean Absolute Error (MAE):', metrics.mean_absolute_error(y_test, pred))
#         print('Mean Squared Error (MSE):', metrics.mean_squared_error(y_test, pred))
#         print('Root Mean Squared Error (RMSE):', np.sqrt(metrics.mean_squared_error(y_test, pred)))
#         mape = np.mean(np.abs((y_test - pred) / np.abs(y_test)))
#         print('Mean Absolute Percentage Error (MAPE):', round(mape * 100, 2))
#         print('Accuracy:', round(100 * (1 - mape), 2))
#         return render(request, "pricer/guess_the_price.html", {"answer": ans})
#
#     return render(request, "pricer/guess_the_price.html", {"answer": False})
