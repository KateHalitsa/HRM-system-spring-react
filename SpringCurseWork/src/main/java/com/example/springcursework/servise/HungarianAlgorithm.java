package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeEfficiencyCalcResult;
import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.payload.request.EmployeeEfficiencyTableCalcRequest;

import java.util.ArrayList;
import java.util.List;

// https://habr.com/ru/articles/63982/

public class HungarianAlgorithm {

    int n;
    int[][] a;            // Матрица эффективности a[разраб][задача]
    int[] xy, yx;         // Паросочетания: xy[разраб], yx[задача]
    boolean[] vx, vy;     // Альтернирующее дерево vx[разраб], vy[задача]
    int[] maxrow, mincol; // Способности, изученность

    Boolean doTry (int i) {

        if (vx[i]) return false;

        vx[i] = true;

        for (int j=0; j<n; ++j)

            if (a[i][j]-maxrow[i]-mincol[j] == 0)

                vy[j] = true;

        for (int j=0; j<n; ++j)

            if (a[i][j]-maxrow[i]-mincol[j] == 0 && yx[j] == -1) {

                xy[i] = j;

                yx[j] = i;

                return true;

            }

        for (int j=0; j<n; ++j)

            if (a[i][j]-maxrow[i]-mincol[j] == 0 && doTry (yx[j])) {

                xy[i] = j;

                yx[j] = i;

                return true;

            }

        return false;

    }

    private int getCellValue(List<EmployeeEfficiencyCell> cellList, int employeeId, int workplaceId){
        int res = 0;
        EmployeeEfficiencyCell found = cellList.stream().
                filter(cell ->
                        (cell.getEmployeeId() == employeeId) && (cell.getWorkplaceId() == workplaceId)
                ).findAny().orElse(null);
        if (found != null){
            res = found.getEfficiency();
        }
        return res;
    }

    private void fillMatrixByRequest(EmployeeEfficiencyTableCalcRequest efficiencyTable) throws Exception {
        List<Integer> employeeList = efficiencyTable.getEmployeeIds();
        List<Integer> workplaceList = efficiencyTable.getWorkplaceIds();
        List<EmployeeEfficiencyCell> cells = efficiencyTable.getCells();

        if (employeeList.size() != workplaceList.size()) {
             throw new Exception("employeeList.size() != workplaceList.size() (%d != %d)".formatted(employeeList.size(), workplaceList.size()));
        }

        n = employeeList.size();
        a = new int[n][n];

        for (int i = 0; i<n; i++){
            for (int j = 0; j<n; j++){
                int employeeId = employeeList.get(i);
                int workplaceId = workplaceList.get(j);
                int value = getCellValue(cells, employeeId, workplaceId);
                a[i][j] = value;
            }

        }
    }

    public EmployeeEfficiencyCalcResult calculate(EmployeeEfficiencyTableCalcRequest efficiencyTable) throws Exception {


        // ... чтение a ...
        fillMatrixByRequest(efficiencyTable);

        mincol = new int[n];

        maxrow = new int[n];

        for (int i=0; i<n; ++i)

            for (int j=0; j<n; ++j)

                maxrow[i] = Math.max(maxrow[i], a[i][j]);



        xy = new int[n];
        for(int i = 0; i < xy.length; i++) xy[i] = -1;


        yx = new int[n]; // .assign (n, -1);
        for(int i = 0; i < yx.length; i++) yx[i] = -1;

        for (int c=0; c<n; ) {

            vx = new boolean[n]; // .assign (n, 0);

            vy = new boolean[n]; // .assign (n, 0);

            int k = 0;

            for (int i=0; i<n; ++i)
                if (xy[i] == -1 && doTry (i))
                    ++k;

            c += k;

            if (k == 0) {

                int z = Integer.MAX_VALUE; // INF;

                for (int i=0; i<n; ++i)

                    if (vx[i])

                        for (int j=0; j<n; ++j)

                            if (!vy[j])

                                z = Math.min(z, maxrow[i]+mincol[j]-a[i][j]);

                for (int i=0; i<n; ++i) {

                    if (vx[i]) maxrow[i] -= z;

                    if (vy[i]) mincol[i] += z;

                }

            }

        }


        List<Integer> employeeList = efficiencyTable.getEmployeeIds();
        List<Integer> workplaceList = efficiencyTable.getWorkplaceIds();

        List<EmployeeWorkplace> res = new ArrayList<>();
        for (int i=0; i<n; ++i){
            int employeeId = employeeList.get(i);
            int workplaceId = workplaceList.get(xy[i]);

            EmployeeWorkplace employeeWorkplace = new EmployeeWorkplace();
            employeeWorkplace.setEmployeeId(employeeId);
            employeeWorkplace.setWorkplaceId(workplaceId);

            res.add(employeeWorkplace);
        }

        int totalEfficiency = 0; // Инициализация переменной для общей эффективности

        for (int i = 0; i < n; ++i) {
            int employeeId = employeeList.get(i);
            int workplaceId = workplaceList.get(xy[i]);

            EmployeeWorkplace employeeWorkplace = new EmployeeWorkplace();
            employeeWorkplace.setEmployeeId(employeeId);
            employeeWorkplace.setWorkplaceId(workplaceId);



            // Добавление значения эффективности
            totalEfficiency += a[i][xy[i]];
        }

        return new EmployeeEfficiencyCalcResult(res, totalEfficiency);
        //return res;

/*
        int ans = 0;

        for (int i=0; i<n; ++i)

            ans += a[i][xy[i]];

        printf ("%d\n", ans);

        for (int i=0; i<n; ++i)
            printf ("%d ", xy[i]+1);
*/
    }

}
