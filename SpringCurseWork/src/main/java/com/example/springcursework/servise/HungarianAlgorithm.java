package com.example.springcursework.servise;

import java.util.ArrayList;
import java.util.Vector;

import static java.lang.Boolean.TRUE;

public class HungarianAlgorithm {

    int n;
    int[][] a;            // Матрица эффективности a[разраб][задача]
    int[] xy, yx;         // Паросочетания: xy[разраб], yx[задача]
    boolean[] vx, vy;     // Альтернирующее дерево vx[разраб], vy[задача]
    int[] maxrow, mincol; // Способности, изученность

    Boolean dotry (int i) {

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

            if (a[i][j]-maxrow[i]-mincol[j] == 0 && dotry (yx[j])) {

                xy[i] = j;

                yx[j] = i;

                return true;

            }

        return false;

    }

    void main() {


        // ... чтение a ...

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
                if (xy[i] == -1 && dotry (i))
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
