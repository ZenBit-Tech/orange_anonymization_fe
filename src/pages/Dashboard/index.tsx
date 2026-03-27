import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Description as DescriptionIcon,
  FindInPage as FindInPageIcon,
  VerifiedUser as VerifiedUserIcon,
  DataObject as DataObjectIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchDashboard } from '@/store/slices/dashboardSlice';
import { formatDate } from '@/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading: boolean;
}

function MetricCard({ title, value, icon, color, isLoading }: MetricCardProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            {isLoading ? (
              <Skeleton width={80} height={40} />
            ) : (
              <Typography variant="h4" fontWeight={700}>
                {value}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${color}22`,
              color,
              display: 'flex',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((s) => s.dashboard);

  useEffect(() => {
    void dispatch(fetchDashboard());
  }, [dispatch]);

  const metrics = [
    {
      title: t('dashboard.metrics.totalDocuments'),
      value: data?.metrics.totalDocuments ?? 0,
      icon: <DescriptionIcon />,
      color: '#1565C0',
    },
    {
      title: t('dashboard.metrics.entitiesDetected'),
      value: data?.metrics.entitiesDetected.toLocaleString() ?? 0,
      icon: <FindInPageIcon />,
      color: '#00897B',
    },
    {
      title: t('dashboard.metrics.anonymizationRate'),
      value: `${data?.metrics.anonymizationRate ?? 0}%`,
      icon: <VerifiedUserIcon />,
      color: '#2E7D32',
    },
    {
      title: t('dashboard.metrics.syntheticRecords'),
      value: data?.metrics.syntheticRecords ?? 0,
      icon: <DataObjectIcon />,
      color: '#F57F17',
    },
  ];

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {t('dashboard.title')}
        </Typography>
        <Typography color="text.secondary">{t('dashboard.subtitle')}</Typography>
      </Box>

      {/* Metric cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((m) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={m.title}>
            <MetricCard {...m} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>

      {/* Charts row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Activity line chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('dashboard.chart.activityTitle')}
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={280} />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={data?.activityChart ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="documents"
                      stroke="#1565C0"
                      strokeWidth={2}
                      dot={false}
                      name={t('dashboard.chart.documents')}
                    />
                    <Line
                      type="monotone"
                      dataKey="entities"
                      stroke="#00897B"
                      strokeWidth={2}
                      dot={false}
                      name={t('dashboard.chart.entities')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Entity distribution bar chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('dashboard.chart.entityDistribution')}
              </Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={280} />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={data?.entityDistribution ?? []}
                    layout="vertical"
                    margin={{ left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      dataKey="entityType"
                      type="category"
                      tick={{ fontSize: 11 }}
                      width={110}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1565C0" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            {t('dashboard.recentActivity.title')}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('dashboard.recentActivity.columns.document')}</TableCell>
                  <TableCell>{t('dashboard.recentActivity.columns.status')}</TableCell>
                  <TableCell align="right">
                    {t('dashboard.recentActivity.columns.entities')}
                  </TableCell>
                  <TableCell align="right">{t('dashboard.recentActivity.columns.date')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))
                  : (data?.recentDocuments ?? []).map((doc) => (
                      <TableRow key={doc.id} hover>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {doc.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={doc.status}
                            size="small"
                            color={
                              doc.status === 'completed'
                                ? 'success'
                                : doc.status === 'failed'
                                  ? 'error'
                                  : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell align="right">{doc.entityCount}</TableCell>
                        <TableCell align="right">{formatDate(doc.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                {!isLoading && (data?.recentDocuments ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="text.secondary" py={3}>
                        {t('dashboard.recentActivity.noActivity')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
